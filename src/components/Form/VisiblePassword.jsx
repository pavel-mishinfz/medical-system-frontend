import React, { useState } from 'react';


export default function VisiblePassword({onHandleClick}) {
  const [visible, setVisible] = useState(false);  

  return (
    <span className="eye" onClick={() => setVisible(!visible)}>
        {visible ? 
        <img src="/img/register/eye-open.svg" alt="eye open" onClick={onHandleClick('text')}/>
        :
        <img src="/img/register/eye-hidden.svg" alt="eye hidden" onClick={onHandleClick('password')}/>
        }
    </span>
  );
}