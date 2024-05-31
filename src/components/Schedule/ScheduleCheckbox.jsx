import React, { useEffect, useState } from 'react';
import ScheduleSettings from './ScheduleSettings';


const ScheduleCheckbox = ({ day, index, scheduleData, setScheduleData, fieldIsDisable }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        if (scheduleData.schedule[index]) {
            const [start, end] = scheduleData.schedule[index].split('-');
            setStartTime(start);
            setEndTime(end);
        } else {
            setStartTime('');
            setEndTime('');
        }
    }, [scheduleData.schedule[index]])

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;

        const updatedSchedule = { ...scheduleData };

        if (isChecked) {
            updatedSchedule.schedule[index] = '';
        } else {
            delete updatedSchedule.schedule[index];
        }

        setScheduleData(updatedSchedule);
    };

    const handleStartTimeChange = (newStartTime) => {
        const updatedSchedule = { ...scheduleData };
        updatedSchedule.schedule[index] = `${newStartTime}-${endTime}`;
        setStartTime(newStartTime);
        setScheduleData(updatedSchedule);
    };

    const handleEndTimeChange = (newEndTime) => {
        const updatedSchedule = { ...scheduleData };
        updatedSchedule.schedule[index] = `${startTime}-${newEndTime}`;
        setEndTime(newEndTime);
        setScheduleData(updatedSchedule);
    };

    return (
        <>
            <div className="schedule__item">
                <input 
                    type="checkbox"
                    name='schedule' 
                    id={`id_day_of_week${index}`} 
                    disabled={fieldIsDisable} 
                    checked={index in scheduleData.schedule} 
                    onChange={handleCheckboxChange} 
                />
                <label htmlFor={`id_day_of_week${index}`} name='schedule'>{day}</label>
            </div>
            {(index in scheduleData.schedule) && (
                <ScheduleSettings 
                    index={index} 
                    startTime={startTime}
                    setStartTime={handleStartTimeChange} 
                    endTime={endTime}
                    setEndTime={handleEndTimeChange} 
                    fieldIsDisable={fieldIsDisable}
                />
            )}
        </>
    );
};

export default ScheduleCheckbox;
