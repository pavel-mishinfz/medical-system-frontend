import React from 'react';
import RecordTypeItem from './RecordTypeItem';

export default function RecordType({setIsOnlineFormat}) {

    return (
        <div className="record-confirm__format">
            <RecordTypeItem id={"format_offline"} label={'Очный прием'} check onHandleClick={() => setIsOnlineFormat(false)}/>
            <RecordTypeItem id={"format_online"} label={'Онлайн консультация'} onHandleClick={() => setIsOnlineFormat(true)}/>
        </div>
    );
};

