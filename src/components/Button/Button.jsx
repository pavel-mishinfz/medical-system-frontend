import React from 'react';


const Button = ({text, onHandleClick}) => {
  return (
    <button onClick={onHandleClick} className="btn" type="button">{text}</button>
  );
}

export default Button;