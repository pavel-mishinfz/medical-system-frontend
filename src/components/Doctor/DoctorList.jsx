import React from 'react';
import Doctor from './Doctor';
import RecordPanel from '../RecordPanel/RecordPanel';


export default function DoctorList({doctors, openRegisterModal}) {
  return (
    <div className="spec__doctors">
        {doctors.map(doctor => 
        <div key={doctor.id} className="spec__doctors-item">
          <Doctor data={doctor}/>
          <RecordPanel doctorId={doctor.id} openRegisterModal={openRegisterModal}/>
        </div>
        )}
    </div>
  );
}
