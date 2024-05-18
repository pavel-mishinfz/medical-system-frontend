import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecordDoctor from './RecordDoctor';
import RecordDate from './RecordDate';
import RecordPatient from './RecordPatient';
import Button from '../Button/Button';
import BeforeDelete from '../Modal/BeforeDelete';


export default function Record({id, doctor, user, doctorId, userId, day, time, isOnlineFormat, isAdmin, setRecordsList}) {
    const [userData, setUserData] = useState(user ? user : null);
    const [doctorData, setDoctorData] = useState(doctor ? doctor : null);
    const [openConfirmForm, setOpenConfirmForm] = useState(false);

    useEffect(() => {
        if (doctorId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://' + window.location.hostname + `:8000/users/doctor/${doctorId}`, {
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
                    const response = await axios.get('http://' + window.location.hostname + `:8000/users/user/${userId}/summary`, {
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

    }, []);

    const handleDeleteRecord = async () => {
        axios.delete('http://' + window.location.hostname + `:8001/records/${id}`)
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

