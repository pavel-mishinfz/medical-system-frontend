import React from 'react';
import TemplateOptionItem from './TemplateOptionItem';


const TemplateOptions = ({options, handleChange, handleDelete}) => {

    return (
        <div className="template__options">
            {options.map(option => 
                <TemplateOptionItem key={option.id} data={option} handleChange={handleChange} handleDelete={handleDelete}/>
            )}
        </div>
    );
}

export default TemplateOptions;
