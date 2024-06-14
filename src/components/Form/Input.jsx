import React, { useState } from 'react';
import VisiblePassword from './VisiblePassword';

export default function Input({type, htmlFor, placeholder, title, value, onChangeInput, error}) {
  const [inputType, setInputType] = useState(type);

  const handleEyeClick = () => {
    setInputType(inputType === 'password' ? 'text' : 'password'); // Переключение типа поля ввода
  };

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
        {error && (
          <p style={{color: 'red'}}>{error}</p>
        )}
        {type === 'password' && (
            <VisiblePassword visible={inputType === 'text'} onHandleClick={handleEyeClick}/>
        )}
    </div>
  );
}