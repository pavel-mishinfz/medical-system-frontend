import React, { useState } from 'react';
import VisiblePassword from './VisiblePassword';

export default function Input({type, htmlFor, placeholder, title, value, onChangeInput}) {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="form__fields-item">
        <input 
        type={inputType} 
        id={htmlFor} 
        value={value} 
        onChange={onChangeInput} 
        placeholder={placeholder} 
        className={value ? 'active': ''}
        />
        <label htmlFor={htmlFor} className={value ? 'active': ''}>{title}</label>
        {type === 'password' && (
            <VisiblePassword onHandleClick={type => setInputType(type)}/>
        )}
    </div>
  );
}