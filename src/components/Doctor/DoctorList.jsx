import React from 'react';
import Doctor from './Doctor';
import RecordPanel from '../Record/RecordPanel';


export default function DoctorList({doctors}) {
  return (
    <div className="spec__doctors">
        {doctors.map((doctor, index) => 
        <div className="spec__doctors-item">
          <Doctor key={doctor.id} data={doctor}/>
          <RecordPanel key={index} doctorId={doctor.id}/>
        </div>
        )}
    </div>
  );
}
