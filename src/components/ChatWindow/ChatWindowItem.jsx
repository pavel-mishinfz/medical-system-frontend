import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import BeforeDelete from '../Modal/BeforeDelete';
import { Link } from 'react-router-dom';

const ChatWindowItem = ({ messageId, message, sendDate, setMessages, isOwner, documents }) => {
    const [openConfirmForm, setOpenConfirmForm] = useState(false);

    const handleMessageDelete = async () => {
        try {
            const response = await axios.delete(`http://${window.location.hostname}:8006/messages/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });
            setMessages(response.data.id);
        } catch (error) {
            console.error('Get User Data Summary Error:', error);
        }
    }

    const supportedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain',
        'text/html'
    ];

    const handleMouseDown = (event, path_to_file) => {
        if (event.button === 0) {
            event.preventDefault();
            const url = `http://${window.location.hostname}:8006/${path_to_file}`;
            openFileInNewWindow(url, sessionStorage.getItem('authToken'));
        }
    };

    const handleAuxClick = (event, path_to_file) => {
        if (event.button === 1) {
            event.preventDefault();
            const url = `http://${window.location.hostname}:8006/${path_to_file}`;
            openFileInNewWindow(url, sessionStorage.getItem('authToken'));
        }
    };

    const openFileInNewWindow = (url, jwtToken) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const mimeType = response.headers.get('content-type');
                return response.blob().then(blob => ({ blob, mimeType }));
            })
            .then(({ blob, mimeType }) => {
                const newUrl = window.URL.createObjectURL(blob);
                if (supportedMimeTypes.includes(mimeType)) {
                    const newWindow = window.open();
                    if (newWindow) {
                        newWindow.location.href = newUrl;
                    } else {
                        console.error('Unable to open new window.');
                    }
                } else {
                    const link = document.createElement('a');
                    link.href = newUrl;
                    link.download = url.split('/').pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    return (
        <div className={isOwner ? `chat__message own` : `chat__message`}>
            {message && (
                <div className="chat__message-body">
                    {isOwner && (
                        <img src="img/options/delete.svg" alt="delete" onClick={() => setOpenConfirmForm(true)} />
                    )}
                    <p>{message}</p>
                </div>
            )}
            {documents && documents.length > 0 && (
                <div className="chat__files">
                    {documents.map(document =>
                        <div key={document.path_to_file} className="chat__files-item">
                            <img src="img/chat/file.svg" alt="file" />
                            <Link
                                to={`http://${window.location.hostname}:8006/${document.path_to_file}`}
                                onClick={(e) => handleMouseDown(e, document.path_to_file)}
                                onAuxClick={(e) => handleAuxClick(e, document.path_to_file)}
                                download={true}
                            >
                                {document.name}
                            </Link>
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