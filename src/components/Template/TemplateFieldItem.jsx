import React from 'react';
import TemplateInput from './TemplateInput';
import TemplateSelect from './TemplateSelect';
import { getTypes } from './TemplateFields';


const TemplateFieldItem = ({title, img, type, name, value, selectOptions, handleChange}) => {

    return (
        <div className="template__fields-item">
            <p className="template__subtitle">
                {title}
                {img}
            </p>
            {type === 'select' && (
                <TemplateSelect types={getTypes()} defaultValue={value} handleChange={handleChange}/>
            )}
            {(type === 'text' || type === 'date') && (
                <TemplateInput type={type} name={name} value={value} handleChange={handleChange}/>
            )}
            {selectOptions && (
                selectOptions
            )}
        </div>
    );
}

export default TemplateFieldItem;
