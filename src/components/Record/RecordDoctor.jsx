import React from 'react';
import UserImage from '../User/UserImage';
import UserInfo from '../User/UserInfo';


export default function RecordDoctor({doctor}) {
    
    return (
        <div className="record-confirm__doctor">
            <UserImage src={doctor.img}/>
            <UserInfo data={doctor}/>
        </div>
    );
};

