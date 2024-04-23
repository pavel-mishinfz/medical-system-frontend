import React from 'react';
import Input from './Input';


export default function InputList({inputListData}) {
  return (
    <div class="form__fields">
        {inputListData.map((inputData, index) => 
            <Input 
            key={index} 
            type={inputData.type} 
            htmlFor={inputData.htmlFor} 
            placeholder={inputData.placeholder}
            title={inputData.title}
            value={inputData.value}
            onChangeInput={inputData.onChangeInput}
            />
        )}
    </div>
  );
}
