import React from 'react';
import { getAgeFromBirthDate, getTextAge } from '../Profile/ProfileInfo';


export default function RecordPatient({user}) {
    const age = getAgeFromBirthDate(user.birthday);
    
    return (
        <div className="record-confirm__patient">
            <img src="/img/sidebar/nav/user.svg" alt="user" />
            <div className="record-confirm__patient-data">
                <p className='record-confirm__patient-name'>{user.surname} {user.name} {user.patronymic}</p>
                <p className='record-confirm__patient-age'>{age} {getTextAge(age)}</p>
            </div>
        </div>
    );
};

