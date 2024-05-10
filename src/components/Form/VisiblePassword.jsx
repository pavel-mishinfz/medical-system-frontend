import React from 'react';


export default function VisiblePassword({visible, onHandleClick}) {
  return (
    <span className="eye" onClick={onHandleClick}>
        {visible ? 
        <img src="/img/register/eye-open.svg" alt="eye open"/>
        :
        <img src="/img/register/eye-hidden.svg" alt="eye hidden"/>
        }
    </span>
  );
}