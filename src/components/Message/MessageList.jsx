import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ listChats, userGroup, handleConnectToWebSocket }) => {

    return (
        <div className="message-list">
            {listChats.map(chat =>
                <MessageItem
                    key={chat.id}
                    userId={userGroup === 'doctor' ? chat.patient_id : chat.doctor_id}
                    chatId={chat.id}
                    handleConnectToWebSocket={handleConnectToWebSocket}
                />
            )}
        </div>
    );
};

export default MessageList;