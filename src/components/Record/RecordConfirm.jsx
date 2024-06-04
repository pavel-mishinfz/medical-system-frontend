import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Button from '../Button/Button';
import RecordDoctor from './RecordDoctor';
import RecordDate from './RecordDate';
import RecordPatient from './RecordPatient';
import RecordType from './RecordType';
import Alert from '../Alert/Alert';


const RecordConfirm = ({ doctor, user, day, time }) => {
    const [isOnlineFormat, setIsOnlineFormat] = useState(false);
    const [hasMedcard, setHasMedcard] = useState(false);
    const [textBtn, setTextBtn] = useState('Записаться');
    const [modify, setModify] = useState('');

    useEffect(() => {
        axios.get('http://' + window.location.hostname + `:8006/cards/me/${user.id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(response => {
                setHasMedcard(true);
            })
            .catch(error => {
                console.error('Get Card Error:', error);
            });
    }, []);

    const handleCreateRecord = async () => {
        let requestBody = {
            date: day,
            time: time,
            id_user: user.id,
            id_doctor: doctor.id,
            is_online: isOnlineFormat
        }

        axios.post('http://' + window.location.hostname + `:8006/records`, requestBody, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(response => {
                console.log('Create Record successful:', response.status);

                if (isOnlineFormat) {
                    requestBody = {
                        record_id: response.data.id,
                        start_date: day,
                        start_time: time
                    }

                    axios.post('http://' + window.location.hostname + `:8006/meetings`, requestBody, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    })
                        .then(response => {
                            console.log('Create meeting successful:', response.status);
                            setTextBtn('Вы записаны!');
                            setModify('btn--success');
                            setTimeout(function () {
                                window.location.replace('/');
                            }, 3000);
                        })
                        .catch(error => {
                            console.error('Create meeting failed:', error);
                        });
                } else {
                    setTextBtn('Вы записаны!');
                    setModify('btn--success');
                    setTimeout(function () {
                        window.location.replace('/');
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Create Record failed:', error);
            });
    }

    return (
        <div className="record-confirm">
            <RecordDoctor doctor={doctor} />
            <hr className="sidebar__divider" />
            <RecordDate day={day} time={time} />
            <RecordPatient user={user} />
            <hr className="sidebar__divider" />
            <RecordType setIsOnlineFormat={setIsOnlineFormat} />
            {isOnlineFormat && !hasMedcard && (
                <Alert text={
                    <>
                    Уважаемый пользователь! У Вас еще нет электронной медицинской карты. Вы можете завести её, если лично посетите наше учреждение. В случае отсутствия данной возможности, Вы всегда можете отправить <a href="/" style={{ color: '#1a5dd0' }}>необходимые документы</a> на почту <a href="/" style={{ color: '#1a5dd0' }}>admin@admin.ru</a>
                    </>
                }/>
            )}
            {(!isOnlineFormat || hasMedcard) && (
                <div className="record-confirm__btn">
                    <Button modify={modify} text={textBtn} onHandleClick={handleCreateRecord} />
                </div>
            )}
        </div>
    );
};

export default RecordConfirm;
