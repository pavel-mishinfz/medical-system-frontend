import React, { useState } from 'react';
import RecordDay from './RecordDay';
import Button from '../Button/Button';


export default function RecordDayList({dayList, onDateChange, currentDate}) {
  const [indexDayList, setIndexDayList] = useState(0);

  return (
    <div className="record__days active">
      {Object.entries(dayList).slice(indexDayList, indexDayList+7).map(([day, time], index) => 
      <RecordDay 
        key={index} 
        data={{day: day, timeList: time}} 
        onDateChange={onDateChange} 
        idxDay={index + indexDayList}
        currentDate={currentDate}
      />
      )}
      {indexDayList === 0 ?
      <Button modify={'btn--expand'} text={<img src="/img/expand.svg" alt="expand" />} onHandleClick={() => setIndexDayList(7)}/>
      :
      <Button modify={'btn--collapse'} text={<img src="/img/expand.svg" alt="expand" />} onHandleClick={() => setIndexDayList(0)} />
      }
    </div>
  );
}
