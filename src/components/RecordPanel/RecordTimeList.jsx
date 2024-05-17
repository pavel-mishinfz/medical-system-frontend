import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';


const initQuantityCellOfTime = 9;

export default function RecordTimeList({doctor, timeList, currentDate, openRegisterModal}) {
  const navigate = useNavigate();
  const [quantityCellOfTime, setQuantityCellOfTime] = useState();
  
  useEffect(() => {
    setQuantityCellOfTime(initQuantityCellOfTime);
  }, [currentDate])

  return (
    <>
    {Object.entries(timeList).slice(currentDate, currentDate+1).map(([day, timeList], index) => 
    <div key={index} className="record__times" style={currentDate === 0 ? {borderTopLeftRadius: '0px'} : {}}>
      {timeList.length <= 10 && (
        timeList.map((time, index) => 
          <Button key={index} text={time} 
          onHandleClick={sessionStorage.getItem('authToken') ? 
          () => navigate(`/confirm-record/${doctor.id}`, {state: {day: day, time: time}}) : openRegisterModal}
          />
        )
      )}
      {timeList.length > 10 && (
        <>
          {timeList.slice(0, quantityCellOfTime).map((time, index) => 
            <Button key={index} text={time} 
            onHandleClick={sessionStorage.getItem('authToken') ? 
            () => navigate(`/confirm-record/${doctor.id}`, {state: {day: day, time: time}}) : openRegisterModal}
            />
          )}
          {quantityCellOfTime === initQuantityCellOfTime ? 
          <Button modify={'btn--expand'} text={<img src="/img/expand.svg" alt="expand" />} onHandleClick={() => setQuantityCellOfTime(timeList.length)}/>
          :
          <Button modify={'btn--collapse'} text={<><img src="/img/expand.svg" alt="expand" /> Свернуть</>} onHandleClick={() => setQuantityCellOfTime(initQuantityCellOfTime)}/>
          }
        </>
      )}
    </div>
    )}
    </>
  );
}
