import React from 'react';
import ScheduleTime from './ScheduleTime';

const ScheduleSettings = ({ index, startTime, setStartTime, endTime, setEndTime, fieldIsDisable }) => {

    return (
        <div className="schedule__item-settings">
            <ScheduleTime id={`start_time${index}`} title={'Начало рабочего дня'} type={'time'} value={startTime} onHandleChange={setStartTime} fieldIsDisable={fieldIsDisable} />
            <ScheduleTime id={`end_time${index}`} title={'Окончание рабочего дня'} type={'time'} value={endTime} onHandleChange={setEndTime} fieldIsDisable={fieldIsDisable} />
        </div>
    );
};

export default ScheduleSettings;
