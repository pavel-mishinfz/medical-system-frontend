import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ selectedChatId, listChats, listUsers, userGroup, handleConnectToWebSocket }) => {

    return (
        <div className="message-list">
            {listChats.map(chat =>
                <MessageItem
                    key={chat.id}
                    userData={userGroup === 'doctor' ? (
                        listUsers.find(user => user.id === chat.patient_id)
                    ) : (
                        listUsers.find(user => user.id === chat.doctor_id)
                    )}
                    chatId={chat.id}
                    handleConnectToWebSocket={handleConnectToWebSocket}
                    chatIsSelect={selectedChatId === chat.id}
                />
            )}
        </div>
    );
};

export default MessageList;