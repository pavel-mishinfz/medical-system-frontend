import React from 'react';


export default function OptionItem({ data: {src, text, isVefiry, onHandleClick} }) {
  return (
    <div className="page__options-item" style={isVefiry ? {opacity: 0.3, pointerEvents: 'none'} : {}} onClick={onHandleClick}>
        <img src={src} alt="edit card" />
        <p>{text}</p>
    </div>
  );
}