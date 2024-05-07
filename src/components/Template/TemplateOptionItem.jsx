import React from 'react';


const TemplateOptionItem = ({data, handleChange, handleDelete}) => {

    return (
        <div className="template__option">
            <input type="text" name="option" value={data.name} onChange={(e) => handleChange(data.id, e.target.value)}/>
            <img src="/img/options/delete-square.svg" alt="delete" onClick={() => handleDelete(data.id)} />
        </div>
    );
}

export default TemplateOptionItem;
