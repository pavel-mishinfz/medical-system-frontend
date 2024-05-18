import React from 'react';
import moment from 'moment';


export default function RecordDate({day, time}) {
    return (
        <div className="record-confirm__date">
            <img src="/img/sidebar/nav/calendar.svg" alt="calendar" />
            <p>{moment(day, 'YYYY-MM-DD').format('D MMMM (dd)')}, {time}</p>
        </div>
    );
};

