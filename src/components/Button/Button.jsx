import React from 'react';


const Button = ({text, onHandleClick, modify}) => {
  return (
    <button onClick={onHandleClick} className={`btn ${modify}`} type="button">{text}</button>
  );
}

export default Button;