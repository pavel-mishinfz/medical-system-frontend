import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MessageItem = ({ chatIsSelect, userId, chatId, handleConnectToWebSocket }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${window.location.hostname}:8006/users/user/${userId}/summary`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Get User Data Summary Error:', error);
            }
        }

        fetchData();
    }, [])

    return (
        <>
            {userData && (
                <div className={chatIsSelect ? 'message-item active' : 'message-item'} onClick={() => handleConnectToWebSocket(chatId, userId)}>
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