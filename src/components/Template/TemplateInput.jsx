import React from 'react';


const TemplateInput = ({type, name, value, handleChange}) => {

    return (
        <input type={type} name={name} value={value} onChange={(e) => handleChange(e.target.value)}/>
    );
}

export default TemplateInput;
