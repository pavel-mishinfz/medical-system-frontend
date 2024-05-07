import React from 'react';


const TemplateSelect = ({types, defaultValue, handleChange}) => {

    return (
        <select name="type" defaultValue={defaultValue} onChange={(e) => handleChange(+e.target.value)}>
            {types.map(type => 
                <option key={type.id} value={type.id}>{type.name}</option>
            )}
        </select>
    );
}

export default TemplateSelect;
