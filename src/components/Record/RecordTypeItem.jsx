import React from 'react';

export default function RecordTypeItem({id, label, check, onHandleClick}) {

    return (
        <div className="record-confirm__format-item">
            <input type="radio" name="format_record" id={id} defaultChecked={check}/>
            <label htmlFor={id} onClick={onHandleClick} name='confirm_record'>{label}</label>
        </div>
    );
};

