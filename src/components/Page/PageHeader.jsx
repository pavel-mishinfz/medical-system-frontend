import React from 'react';
import moment from 'moment';


export default function PageHeader({title, date, doctor, patient}) {
  return (
    <div className="page__header">
        <div className="page__title">{title}</div>
        <div className="page__info">
            {date && (
            <div className="page__info-item">
                <div className="page__info-title">Дата</div>
                <div className="page__info-text">{moment(date).utc(true).format('DD/MM/YYYY HH:mm')}</div>
            </div>
            )}
            <div className="page__info-item">
                <div className="page__info-title">Врач</div>
                <div className="page__info-text">{doctor}</div>
            </div>
            <div className="page__info-item">
                <div className="page__info-title">Пациент</div>
                <div className="page__info-text">{patient}</div>
            </div>
        </div>
    </div>
  );
}