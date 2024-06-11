import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatHead = ({ targetUserId, setActiveChatLeft }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${window.location.hostname}:8006/users/user/${targetUserId}/summary`, {
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
    }, [targetUserId])

    return (
        <>
            {userData && (
                <>
                <div className="chat__head">
                    <img className='chat__expand' src="/img/expand.svg" alt="expand-chat" onClick={() => {setActiveChatLeft(true)}}/>
                    <img src={`http://localhost:8006/${userData.img ? userData.img : 'storage/img_user_none.jpg'}`} alt="avatar" className="avatar" />
                    <p>{userData.name} {userData.surname}</p>
                </div>
                </>
            )}
        </>
    );
};

export default ChatHead;