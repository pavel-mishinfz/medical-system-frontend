import React from 'react';

export default function DoctorInfo({data: {name, surname, patronymic, desc, exp}}) {
  return (
    <div className="doctor__info">
        <h3 className="doctor__info-name">{`${surname} ${name} ${patronymic}`}</h3>
        <p className="doctor__info-spec">{desc}</p>
        <p className="doctor__info-exp">Стаж {exp} лет</p>
    </div>
  );
}
