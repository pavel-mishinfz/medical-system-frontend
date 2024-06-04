import React from 'react';

export default function UserImage({src, handleClick}) {
  return (
      <div className="doctor__img" onClick={handleClick} style={handleClick ? {cursor: 'pointer'} : {}}>
          <img src={`http://localhost:8006/${src ? src : 'storage/img_user_none.jpg'}`} alt="avatar" />
      </div>
  );
}