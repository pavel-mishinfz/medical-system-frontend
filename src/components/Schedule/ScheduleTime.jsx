import React from 'react';

const ScheduleTime = ({ id, title, type, value, onHandleChange, fieldIsDisable }) => {

    return (
        <>
        <div className="schedule__item-time">
            <label htmlFor={`id_${id}`} name='schedule'>{title}</label>
            <input type={type} name='schedule' disabled={fieldIsDisable} value={value} onChange={(e) => onHandleChange(e.target.value)} id={`id_${id}`} />
        </div>
        </>
    );
};

export default ScheduleTime;
