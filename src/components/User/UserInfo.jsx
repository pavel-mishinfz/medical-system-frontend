import React from 'react';
import moment from 'moment';


export default function UserInfo({data}) {
  const experience = data.date_employment && calculateExperience(data.date_employment);

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

export const formatExperience = (exp) => {
  if (exp % 10 === 1 && exp % 100 !== 11) {
    return 'год';
  } else if ([2, 3, 4].includes(exp % 10) && ![12, 13, 14].includes(exp % 100)) {
    return 'года';
  } else {
    return 'лет';
  }
};


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