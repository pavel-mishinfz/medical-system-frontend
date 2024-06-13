import React from 'react';


const MessageItem = ({ chatIsSelect, userData, chatId, handleConnectToWebSocket }) => {

    return (
        <>
            {userData && (
                <div className={chatIsSelect ? 'message-item active' : 'message-item'} onClick={() => handleConnectToWebSocket(chatId, userData.id)}>
                    <img src={`http://localhost:8006/${userData.img ? userData.img : 'storage/img_user_none.jpg'}`} alt="avatar" className="avatar" />
                    <div className="message-item__details">
                        <div className="message-item__sender">{userData.name} {userData.surname}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageItem;