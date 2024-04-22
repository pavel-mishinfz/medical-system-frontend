import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RecordDayList from './RecordDayList';
import RecordTimeList from './RecordTimeList';


const RecordPanel = ({doctorId}) => {
  const [currentDate, setCurrentDate] = useState(0);
  const [availableDates, setAvailableDates] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+ window.location.hostname + `:8001/schedules/doctor/${doctorId}`);
        
        setAvailableDates(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
      <div className="record">
          {availableDates && (
            <>
            <RecordDayList dayList={availableDates} onDateChange={date => setCurrentDate(date)} currentDate={currentDate}/>
            <RecordTimeList timeList={availableDates} currentDate={currentDate}/>
            </>
          )}
      </div>
  );
}

export default RecordPanel;