import React from 'react';

export default function DoctorInfo({data: {name, surname, patronymic, desc, exp}}) {
  return (
    <div className="doctor__info">
        <h3 className="doctor__info-name">{`${surname} ${name} ${patronymic}`}</h3>
        <p className="doctor__info-desc">{desc}</p>
        <p className="doctor__info-exp">Стаж {exp} {formatExperience(exp)}</p>
    </div>
  );
}

export function formatExperience(exp) {
  if ((exp > 9 && exp < 15) || exp % 10 >= 5) {
    return 'лет';
  }
  if (exp % 10 === 1) {
    return 'год';
  }
  if ((exp % 10 > 1) && (exp % 10 < 5)) {
    return 'года';
  }
}
