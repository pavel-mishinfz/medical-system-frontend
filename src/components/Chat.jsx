import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import MessageList from './Message/MessageList';
import ChatHead from './ChatWindow/ChatHead';
import ChatWindow from './ChatWindow/ChatWindow';
import ChatFooter from './ChatWindow/ChatFooter';


let ws = null;

const Chat = ({ currentUser }) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [targetUserId, setTargetUserId] = useState(null);
    const [messages, setMessages] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [listChats, setListChats] = useState(null);
    const [filesOfMessage, setFilesOfMessage] = useState([]);

    const userGroup = currentUser.specialization_id ? 'doctor' : 'patient';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${window.location.hostname}:8005/chats/${userGroup}/${currentUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setListChats(response.data);
                if (response.data.length > 0) {
                    setTargetUserId(userGroup === 'doctor' ? response.data[0].patient_id : response.data[0].doctor_id)
                }
            } catch (error) {
                console.error('Get List Chats Error:', error);
            }
        }

        fetchData();
    }, [])

    const appendMessage = async (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    }

    const sendMessage = async (event) => {
        event.preventDefault();

        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.log("Connection not found. Please connect first.");
            return;
        }

        let data = {
            'message': '',
            'files': []
        };
        let input = document.getElementById("messageText");
        const message = input.value.trim();

        if (!message && !filesOfMessage.length) {
            console.log("Message cannot be empty.");
        } else {
            if (filesOfMessage.length > 0) {
                const formData = new FormData();
                filesOfMessage.forEach((file, index) => {
                    formData.append('files', file);
                });
    
                try {
                    const response = await axios.post(`http://${window.location.hostname}:8005/messages/files/`, formData, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                            ContentType: 'multipart/form-data',
                        },
                    });
    
                    data['files'] = response.data;
    
                } catch (error) {
                    console.error('Add files to message Error:', error);
                }
            }

            data['message'] = message;
            ws.send(JSON.stringify(data));
    
            input.value = '';
            setFilesOfMessage([]);
        }
    }

    const connectToWebSocket = async (chatId) => {
        setChatId(chatId);

        if (!chatId) {
            console.log("Room ID is required.");
            return;
        }

        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("Already connected to a session.");
            return;
        }

        ws = new WebSocket(`ws://localhost:8005/ws/${chatId}/${currentUser.id}`);
        ws.binaryType = "arraybuffer";

        ws.onopen = function () {
            console.log("Connected to the session.");
            getLastMessages(chatId);
        };

        ws.onmessage = function (event) {
            const message = JSON.parse(event.data);
            appendMessage(message);
        };

        ws.onerror = function () {
            console.log("Connection error.");
        };
    }

    const getLastMessages = async (chatId) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            try {
                const response = await axios.get(`http://${window.location.hostname}:8005/messages/last/${chatId}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setMessages(response.data.sort((a, b) => new Date(a.send_date) - new Date(b.send_date)));
            } catch (error) {
                console.error('Get Last Messages Error:', error);
            }
        }
    }

    return (
        <>
            {listChats && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <section className="section section--chat">
                            <div className="chat">
                                <div className="chat__left">
                                    <MessageList listChats={listChats} userGroup={userGroup} handleConnectToWebSocket={connectToWebSocket} />
                                </div>
                                {ws && targetUserId && messages && (
                                    <div className="chat__right">
                                        <ChatHead targetUserId={targetUserId} />
                                        <ChatWindow 
                                            messages={messages} 
                                            setMessages={setMessages}
                                            chatId={chatId}
                                            ownerId={currentUser.id} 
                                        />
                                        <ChatFooter
                                            handleSendMessage={sendMessage}
                                            filesOfMessage={filesOfMessage}
                                            setFilesOfMessage={setFilesOfMessage}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                    <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
                </>
            )}
        </>
    );
}

export default Chat;