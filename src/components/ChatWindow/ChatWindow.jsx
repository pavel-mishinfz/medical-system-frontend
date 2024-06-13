import React, { useEffect, useState } from 'react';
import ChatWindowItem from './ChatWindowItem';
import moment from 'moment';
import Button from '../Button/Button';
import axios from 'axios';

const ChatWindow = ({ messages, setMessages, chatId, ownerId }) => {
    const [skip, setSkip] = useState(0);
    const [prevMessagesIsNone, setPrevMessagesIsNone] = useState(false);

    useEffect(() => {
        setPrevMessagesIsNone(false);
        setSkip(0);
    }, [chatId])

    const handleShowPrevMessage = async() => {
        try {
            const response = await axios.get(`http://${window.location.hostname}:8006/messages/last/${chatId}?skip=${skip+20}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });
            const prevMessages = response.data.sort((a, b) => new Date(a.send_date) - new Date(b.send_date));
            if (prevMessages.length < 20) {
                setPrevMessagesIsNone(true);
            }
            setMessages([...prevMessages, ...messages]);
            setSkip(skip+20);
        } catch (error) {
            console.error('Get Last Messages Error:', error);
        }
    }

    return (
        <div className="chat__window">
            {!prevMessagesIsNone && messages.length > 19 && (
                <Button text={'Показать еще'} onHandleClick={handleShowPrevMessage}/>
            )}
            {Object.keys(groupedMessages(messages)).map(date =>
                <div key={date} className="chat__window-messages">
                    <p className='chat__window-date'>{date}</p>
                    {groupedMessages(messages)[date].map(msg =>
                        <ChatWindowItem
                            key={msg.id}
                            messageId={msg.id}
                            message={msg.message}
                            sendDate={msg.send_date}
                            setMessages={(messageId) => setMessages(messages.filter(msg => msg.id !== messageId))}
                            isOwner={msg.sender_id === ownerId}
                            documents={msg.documents}
                        />
                    )}
            </div>
            )}
        </div>
    );
};

export default ChatWindow;


function groupedMessages(messages) {
    return messages.reduce((acc, message) => {
        const date = moment(message.send_date).utc(true).format('D MMMM, YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(message);
        return acc;
    }, {})
}