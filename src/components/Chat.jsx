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
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [listChats, setListChats] = useState(null);
    const [listUsers, setListUsers] = useState(null);
    const [filesOfMessage, setFilesOfMessage] = useState([]);
    const [activeChatLeft, setActiveChatLeft] = useState(false);
    const [hiddenChatLeft, setHiddenChatLeft] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [error, setError] = useState(null);

    const userGroup = currentUser.specialization_id ? 'doctor' : 'patient';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${window.location.hostname}:5000/chats/${currentUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setListChats(response.data);
            } catch (error) {
                console.error('Get List Chats Error:', error);
            }

            try {
                const response = await axios.get(`http://${window.location.hostname}:5000/users/all/summary`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setListUsers(response.data);
            } catch (error) {
                console.error('Get List Users Error:', error);
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

        let input = document.getElementById("messageText");
        const message = input.value.trim();
        let fileData = null;

        if (!message && !filesOfMessage.length) {
            setError('Сообщение не может быть пустым');
            setTimeout(function () {
                setError(null);
            }, 3000);
            return;
        } 

        if (filesOfMessage.length > 0) {
            const fileDataPromises = filesOfMessage.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64Data = reader.result.split(',')[1];
                        resolve({
                            file_name: file.name,
                            file_content: base64Data,
                            mime_type: file.type,
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            fileData = await Promise.all(fileDataPromises);
        }

        const messageData = JSON.stringify({
            message: message,
            files: fileData,
        });
        ws.send(messageData);

        input.value = '';
        setFilesOfMessage([]);
    }

    const connectToWebSocket = async (chatId, userId) => {
        if (!chatId) {
            console.log("Room ID is required.");
            return;
        }

        setActiveChatLeft(false)
        if (windowWidth <= 768) {
            setHiddenChatLeft(true);
        }
        if (ws && ws.readyState === WebSocket.OPEN && chatId === selectedChatId) {
            console.log("Already connected to a session.");
            return;
        }

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
            ws = null;
        }

        setSelectedChatId(chatId);
        setTargetUserId(userId);

        ws = new WebSocket(`ws://${window.location.hostname}:5000/ws/${chatId}/${currentUser.id}?token=${sessionStorage.getItem('authToken')}`);

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
                const response = await axios.get(`http://${window.location.hostname}:5000/messages/last/${chatId}`, {
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

    useEffect(() => {
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowWidth <= 768 && !ws) {
            setActiveChatLeft(true);
        } else if (windowWidth <= 768) {
            setHiddenChatLeft(true);
        } else {
            setActiveChatLeft(false);
            setHiddenChatLeft(false);
        }
    }, [windowWidth]);

    return (
        <>
            {listChats && listUsers && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <section className="section section--chat">
                            <div className="chat">
                                <div className={activeChatLeft ? 'chat__left active' : 'chat__left'} style={hiddenChatLeft ? {display: 'none'} : {}}>
                                    <MessageList
                                        selectedChatId={selectedChatId}
                                        listChats={listChats}
                                        listUsers={listUsers}
                                        userGroup={userGroup} 
                                        handleConnectToWebSocket={connectToWebSocket}
                                    />
                                </div>
                                {ws && targetUserId && messages && (
                                    <div className="chat__right">
                                        <ChatHead 
                                            targetUserData={listUsers.find(user => user.id === targetUserId)} 
                                            setActiveChatLeft={(state) => {
                                                setActiveChatLeft(state);
                                                setHiddenChatLeft(false);
                                            }}
                                        />
                                        <ChatWindow 
                                            messages={messages} 
                                            setMessages={setMessages}
                                            chatId={selectedChatId}
                                            ownerId={currentUser.id} 
                                        />
                                        <ChatFooter
                                            handleSendMessage={sendMessage}
                                            filesOfMessage={filesOfMessage}
                                            setFilesOfMessage={setFilesOfMessage}
                                            error={error}
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