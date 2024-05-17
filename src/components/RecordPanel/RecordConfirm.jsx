import React, { useState } from 'react';
import axios from 'axios';
import UserImage from '../User/UserImage';
import UserInfo from '../User/UserInfo';
import moment from 'moment';
import { getAgeFromBirthDate, getTextAge } from '../Profile/ProfileInfo';
import Button from '../Button/Button';


const RecordConfirm = ({doctor, user, day, time}) => {
    const age = getAgeFromBirthDate(user.birthday);
    const [isOnlineFormat, setIsOnlineFormat] = useState(false);

    const handleCreateRecord = async () => {
        const requestBody = {
            date: day,
            time: time,
            id_user: user.id,
            id_doctor: doctor.id
        }

        axios.post('http://' + window.location.hostname + `:8001/records`, requestBody, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(response => {
                console.log('Create Record successful:', response.status);
            })
            .catch(error => {
                console.error('Create Record failed:', error);
            });
    }
    
    return (
        <div className="record-confirm">
            <div className="record-confirm__doctor">
                <UserImage src={doctor.img}/>
                <UserInfo data={doctor}/>
            </div>
            <hr className="sidebar__divider" />
            <div className="record-confirm__date">
                <img src="/img/sidebar/nav/calendar.svg" alt="calendar" />
                <p>{moment(day, 'YYYY-MM-DD').format('D MMMM (dd)')}, {time}</p>
            </div>
            <div className="record-confirm__patient">
                <img src="/img/sidebar/nav/user.svg" alt="user" />
                <div className="record-confirm__patient-data">
                    <p className='record-confirm__patient-name'>{user.surname} {user.name} {user.patronymic}</p>
                    <p className='record-confirm__patient-age'>{age} {getTextAge(age)}</p>
                </div>
            </div>
            <hr className="sidebar__divider" />
            <div className="record-confirm__format">
                <div className="record-confirm__format-item">
                    <input type="radio" name="format_record" id="format_offline" defaultChecked/>
                    <label htmlFor="format_offline" onClick={() => setIsOnlineFormat(false)}>Очный прием</label>
                </div>
                <div className="record-confirm__format-item">
                    <input type="radio" name="format_record" id="format_online"/>
                    <label htmlFor="format_online" onClick={() => setIsOnlineFormat(true)}>Онлайн консультация</label>
                </div>
            </div>
            <div className="record-confirm__btn">
                <Button text={'Записаться'} onHandleClick={handleCreateRecord}/>
            </div>
        </div>
    );
};

export default RecordConfirm;
