import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatHead = ({ targetUserId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${window.location.hostname}:8000/users/user/${targetUserId}/summary`, {
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
                <div className="chat__head">
                    <img src={`http://localhost:8000/${userData.img ? userData.img : 'storage/img_user_none.jpg'}`} alt="avatar" className="avatar" />
                    <p>{userData.name} {userData.surname}</p>
                </div>
            )}
        </>
    );
};

export default ChatHead;