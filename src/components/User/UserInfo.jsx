import React from 'react';
import moment from 'moment';


export default function UserInfo({data}) {
  const experience = calculateExperience(data.date_employment);

  return (
    <div className="doctor__info">
        <h3 className="doctor__info-name">{`${data.surname} ${data.name} ${data.patronymic}`}</h3>
        {data.specialization_id !== null ?
        <>
        <p className="doctor__info-desc">{data.desc}</p>
        <p className="doctor__info-exp">Стаж {experience > 0 ? experience : 'меньше'} {formatExperience(experience)}</p>
        </>
        :
        <>
        <p className="doctor__info-exp">Дата рождения {moment(data.birthday).utc(true).format('DD/MM/YYYY')}</p>
        </>
        }
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
  // if ((exp % 10 > 1) && (exp % 10 < 5)) {
  //   return 'года';
  // }
  return 'года';
}


export function calculateExperience(dateEmployment) {
  const start = moment(dateEmployment);
  const end = moment();

  let age = end.diff(start, 'years');

  if (
    end.month() < start.month() ||
    (end.month() === start.month() && end.date() < start.date())
  ) {
    age--;
  }

  
  return age;
}