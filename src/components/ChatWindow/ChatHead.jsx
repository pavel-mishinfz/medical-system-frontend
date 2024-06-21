import React from 'react';

const ChatHead = ({ targetUserData, setActiveChatLeft }) => {

    return (
        <>
            {targetUserData && (
                <>
                <div className="chat__head">
                    <img className='chat__expand' src="/img/expand.svg" alt="expand-chat" onClick={() => {setActiveChatLeft(true)}}/>
                    <img src={`http://${window.location.hostname}:5000/${targetUserData.img ? targetUserData.img : 'storage/img_user_none.jpg'}`} alt="avatar" className="avatar" />
                    <p>{targetUserData.name} {targetUserData.surname}</p>
                </div>
                </>
            )}
        </>
    );
};

export default ChatHead;