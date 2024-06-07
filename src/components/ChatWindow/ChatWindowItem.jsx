import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import BeforeDelete from '../Modal/BeforeDelete';

const ChatWindowItem = ({ messageId, message, sendDate, setMessages, isOwner, documents }) => {
    const [openConfirmForm, setOpenConfirmForm] = useState(false);

    const handleMessageDelete = async() => {
        try {
            const response = await axios.delete(`http://${window.location.hostname}:8005/messages/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });
            setMessages(response.data.id);
        } catch (error) {
            console.error('Get User Data Summary Error:', error);
        }
    }

    return (
        <div className={isOwner ? `chat__message own` : `chat__message`}>
            {message && (
                <div className="chat__message-body">
                    {isOwner && (
                        <img src="img/options/delete.svg" alt="delete" onClick={() => setOpenConfirmForm(true)}/>
                    )}
                    <p>{message}</p>
                </div>
            )}
            {documents && documents.length > 0 && (
                <div className="chat__files">
                    {documents.map(document =>
                        <div key={document.path_to_file} className="chat__files-item">
                            <img src="img/chat/file.svg" alt="file" />
                            <a href={document.path_to_file} download>{document.name}</a>
                        </div>
                    )}
                </div>
            )}
            <span>{moment(sendDate).utc(true).format('HH:mm')}</span>
            {openConfirmForm && (
                <BeforeDelete 
                    title={'Удалить сообщение'}
                    handleDelete={handleMessageDelete}
                    setOpenConfirmForm={() => setOpenConfirmForm(false)}
                />
            )}
        </div>
    );
};

export default ChatWindowItem;