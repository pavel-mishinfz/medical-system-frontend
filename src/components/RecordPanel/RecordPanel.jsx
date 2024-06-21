import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RecordDayList from './RecordDayList';
import RecordTimeList from './RecordTimeList';


const RecordPanel = ({doctor, openRegisterModal}) => {
  const [currentDate, setCurrentDate] = useState(null);
  const [availableDates, setAvailableDates] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+ window.location.hostname + `:5000/schedules/doctor/${doctor.id}/available_dates`);
        
        setAvailableDates(response.data);
        setCurrentDate(findFirstEmptyIndex(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
      <div className="record">
          {availableDates && currentDate !== null && (
            <>
            <RecordDayList dayList={availableDates} onDateChange={date => setCurrentDate(date)} currentDate={currentDate}/>
            <RecordTimeList doctor={doctor} timeList={availableDates} currentDate={currentDate} openRegisterModal={openRegisterModal}/>
            </>
          )}
      </div>
  );
}

export default RecordPanel;


function findFirstEmptyIndex(obj) {
  for (const [index, key] of Object.keys(obj).entries()) {
    if (obj[key].length !== 0) {
      return index;
    }
  }
  return 0;
}