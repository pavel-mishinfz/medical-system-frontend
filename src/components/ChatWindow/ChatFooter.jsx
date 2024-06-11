import React, { useState } from 'react';
import AutoExpandTextarea from './AutoExpandTextarea';


const ChatFooter = ({ handleSendMessage, filesOfMessage, setFilesOfMessage }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFilesOfMessage([...filesOfMessage, ...newFiles]);
        event.target.value = '';
    };

    const handleFileDelete = (targetIndex) => {
        const changedFilesOfMessage = filesOfMessage.filter((_, index) => index !== targetIndex);
        setFilesOfMessage([...changedFilesOfMessage]);
    };

    return (
        <>
            <form className="chat__footer" onSubmit={handleSendMessage}>
                <img className='chat__footer-img' src="img/chat/paperclip.svg" alt="paperclip" onClick={() => document.getElementById('fileMessage').click()}/>
                <AutoExpandTextarea
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Введите ваше сообщение..."
                />
                {/* <input className='chat__footer-input' id='messageText' type="text" /> */}
                <button className='chat__footer-send' type='submit'>
                    <img src="img/chat/send.svg" alt="send" />
                </button>
            </form>
            {filesOfMessage.length > 0 && (
                <div className="chat__footer-files">
                    {filesOfMessage.map((file, index) =>
                        <div key={file.name + index} className="chat__footer-file">
                            <img src="img/chat/file.svg" alt="file" />
                            <p>{file.name}</p>
                            <span onClick={() => handleFileDelete(index)}>&times;</span>
                        </div>
                    )}
                </div>
            )}
            <input 
                type="file" 
                multiple 
                hidden 
                id='fileMessage' 
                onChange={handleFileChange}
                accept='
                application/pdf,
                application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                application/x-zip-compressed,
                image/png,
                image/jpeg
                '
            />
        </>
    );
};

export default ChatFooter;