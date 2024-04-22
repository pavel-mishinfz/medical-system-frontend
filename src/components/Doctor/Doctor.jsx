import React from 'react';
import DoctorImage from './DoctorImage';
import DoctorInfo from './DoctorInfo';

const Doctor = ({data: {img, name, surname, patronymic, desc, experience }}) => {
  return (
    <div className="doctor">
        <DoctorImage src={img}/>
        <DoctorInfo 
        data={
          {
            name: name, 
            surname: surname, 
            patronymic: patronymic, 
            desc: desc, 
            exp: experience
          }
        }
        />
    </div>
  );
}

export default Doctor;