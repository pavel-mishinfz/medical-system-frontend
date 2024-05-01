import React from 'react';


export default function OptionItem({ data: {src, text, onHandleClick} }) {
  return (
    <div className="page__options-item" onClick={onHandleClick}>
        <img src={src} alt="edit card" />
        <p>{text}</p>
    </div>
  );
}