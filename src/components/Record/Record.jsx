import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecordDoctor from './RecordDoctor';
import RecordDate from './RecordDate';
import RecordPatient from './RecordPatient';
import Button from '../Button/Button';
import BeforeDelete from '../Modal/BeforeDelete';
import moment from 'moment';


export default function Record({id, doctor, user, doctorId, userId, day, time, isOnlineFormat, isAdmin, setRecordsList, meetingsList}) {
    const [userData, setUserData] = useState(user ? user : null);
    const [doctorData, setDoctorData] = useState(doctor ? doctor : null);
    const [openConfirmForm, setOpenConfirmForm] = useState(false);
    const [meetingData, setMeetingData] = useState(null);

    useEffect(() => {
        if (doctorId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://' + window.location.hostname + `:5000/users/user/${doctorId}/summary`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
                    setDoctorData(response.data);
                } catch (error) {
                    console.error('Get Doctor Error:', error);
                }
            };

            fetchData();

        }
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://' + window.location.hostname + `:5000/users/user/${userId}/summary`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Get User Summary Error:', error);
                }
            };

            fetchData();
        }

        if(isOnlineFormat) {
            const meeting = meetingsList.find(item => item.record_id === id);

            const currentDate = moment().format('YYYY-MM-DD');
            const currentTime = moment();

            const [hours, minutes] = time.split(':');
            const targetTimeMoment = moment().hours(hours).minutes(minutes).seconds(0);

            const timeDifference = Math.abs(currentTime.diff(targetTimeMoment, 'minutes'));

            if (meeting && meeting.start_date === currentDate) {
                axios.get('http://' + window.location.hostname + `:5000/meetings/${meeting.meeting_id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                })
                    .then(response => {
                        setMeetingData(response.data);
                    })
                    .catch(error => {
                        console.error('Get meeting failed:', error);
                    });
            }
        }

    }, []);
    
    const handleDeleteRecord = async () => {
        axios.delete('http://' + window.location.hostname + `:5000/records/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(response => {
                setRecordsList(response.data);
            })
            .catch(error => {
                console.error('Delete Record failed:', error);
            });
    }
    
    return (
        <>
            {doctorData && userData && (
                <>
                    <div className="record-confirm">
                        <RecordDoctor doctor={doctorData} />
                        <hr className="sidebar__divider" />
                        <RecordDate day={day} time={time} />
                        <RecordPatient user={userData} />
                        <hr className="sidebar__divider" />
                        {isOnlineFormat ? (
                            <p className="record-confirm__format-text">Онлайн консультация</p>
                        ) : (
                            <p className="record-confirm__format-text">Очный прием</p>
                        )}
                        <hr className="sidebar__divider" />
                        {isOnlineFormat && doctor && meetingData && (
                            <div className="record-confirm__btn">
                                <Button text={'Начать встречу'} onHandleClick={() => window.open(meetingData.start_url, '_blank')}/>
                            </div>
                        )}
                        {isOnlineFormat && user && meetingData && (
                            <div className="record-confirm__btn">
                                <Button text={'Присоединиться к встрече'} onHandleClick={() => window.open(meetingData.join_url, '_blank')}/>
                            </div>
                        )}
                        {isAdmin && (
                            <div className="record-confirm__btn">
                                <Button modify={'btn--cancel'} text={'Отменить запись'} onHandleClick={() => setOpenConfirmForm(true)} />
                            </div>
                        )}
                    </div>
                    {openConfirmForm && (
                        <BeforeDelete title={'Удалить запись'} handleDelete={handleDeleteRecord} setOpenConfirmForm={setOpenConfirmForm}/>
                    )}
                </>
            )}
        </>
    );
};

