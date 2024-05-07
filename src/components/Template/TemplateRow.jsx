import React from 'react';
import TemplateInput from './TemplateInput';
import TemplateFields from './TemplateFields';


const TemplateRow = ({title, img, type, name, value, onRowChange, fields, deleteField}) => {

    return (
        <div className="template__row">
            <h4 className="template__h4">
                {title}
                {img}
            </h4>
            {!fields ?
                <TemplateInput type={type} name={name} value={value} handleChange={onRowChange}/>
            :
                fields.map((field, index) => 
                    <TemplateFields key={index} index={index} field={field} handleChange={onRowChange} deleteField={deleteField}/>
                )
            }
        </div>
    );
}

export default TemplateRow;
