import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';


export default function RecordDay({data: {day, timeList}, onDateChange, idxDay, currentDate}) {
  let dayOfWeek = moment(day).utc(true).format('dd');
  dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return (
    <div 
    className={idxDay === currentDate ? 'record__day active' : timeList.length > 0 ? 'record__day' : 'record__day disable'} 
    onClick={() => onDateChange(idxDay)}
    >
      <div className="record__day-name">
        {dayOfWeek}
        </div>
      <div className="record__day-number">{moment(day).utc(true).format('DD')}</div>
    </div>
  );
}
