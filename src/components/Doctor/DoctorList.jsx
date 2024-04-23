import React from 'react';
import Doctor from './Doctor';
import RecordPanel from '../RecordPanel/RecordPanel';


export default function DoctorList({doctors, openRegisterModal}) {
  return (
    <div className="spec__doctors">
        {doctors.map((doctor, index) => 
        <div className="spec__doctors-item">
          <Doctor key={doctor.id} data={doctor}/>
          <RecordPanel key={index} doctorId={doctor.id} openRegisterModal={openRegisterModal}/>
        </div>
        )}
    </div>
  );
}
