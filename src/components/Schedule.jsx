import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Header from './Header/Header';
import { getDaysOfWeek } from '../getDaysOfWeek';
import ScheduleCheckbox from './Schedule/ScheduleCheckbox';
import ScheduleTime from './Schedule/ScheduleTime';
import Button from './Button/Button';
import Alert from './Alert/Alert';


const Schedule = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [scheduleInitData, setScheduleInitData] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [scheduleDataisLoading, setScheduleDataisLoading] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [fieldIsDisable, setFieldIsDisable] = useState(true);
    const [isNewSchedule, setIsNewSchedule] = useState(false);
    const [errors, setErrors] = useState({});

    const params = useParams();
    const userId = params.id;
    const daysOfWeek = getDaysOfWeek();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://' + window.location.hostname + `:8006/users/user/${userId}/summary`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    }
                });

                setUserData(response.data);
            } catch (error) {
                console.error('Get Doctor Error:', error);
            }

            try {
                const response = await axios.get('http://' + window.location.hostname + `:8006/schedules/doctor/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    }
                });
                const initSchedule = response.data;
                setScheduleInitData(JSON.parse(JSON.stringify(initSchedule)));
                setScheduleData(initSchedule);
            } catch (error) {
                console.error('Get Schedule Error:', error);
            }
            setScheduleDataisLoading(true);
        }

        fetchData();
    }, [])

    const handleCreateSchedule = async () => {
        setFieldIsDisable(true);
        const requestBody = {
            id_doctor: scheduleData.id_doctor,
            schedule: scheduleData.schedule,
            time_per_patient: scheduleData.time_per_patient
        };

        try {
            const response = await axios.post('http://' + window.location.hostname + `:8006/schedules`, requestBody, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            setScheduleData(response.data);
            setOpenUpdateForm(false);
            setIsNewSchedule(false);
            setErrors({});
        } catch (error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                const field = error.loc[1];
                errorDetails[field] = error.msg.split(',')[1];
            });
            setErrors(errorDetails);
            setFieldIsDisable(false);
        }
    }

    const handleUpdateSchedule = async () => {
        setFieldIsDisable(true);
        const requestBody = {
            schedule: scheduleData.schedule,
            time_per_patient: scheduleData.time_per_patient
        };

        try {
            const response = await axios.patch('http://' + window.location.hostname + `:8006/schedules/${scheduleData.id}`, requestBody, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            setScheduleData(response.data);
            setOpenUpdateForm(false);
            setErrors({});
        } catch (error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                const field = error.loc[1];
                errorDetails[field] = error.msg.split(',')[1];
            });
            setErrors(errorDetails);
            setFieldIsDisable(false);
        }
    }
    
    return (
        <>
            {userData && scheduleDataisLoading && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />

                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <section className="section">
                            <div className="schedule-wrap">
                                <Header title={'График работы'} />
                                <div className="schedule">
                                    <div className="schedule__left">
                                        <img src={`http://${window.location.hostname}:8006/${userData.img ? userData.img : 'storage/img_user_none.jpg'}`} alt="avatar" />
                                        <p>{userData.surname} {userData.name} {userData.patronymic}</p>
                                    </div>
                                    <div className="schedule__right">
                                        {!scheduleData && (
                                            <Alert text={'График работы для данного пользователя еще не задан'} />
                                        )}
                                        {scheduleData && daysOfWeek && daysOfWeek.map((day, index) =>
                                            <div key={day} className="schedule__right-item">
                                                <ScheduleCheckbox
                                                    day={day}
                                                    index={index}
                                                    scheduleData={scheduleData}
                                                    setScheduleData={setScheduleData}
                                                    fieldIsDisable={fieldIsDisable}
                                                />
                                            </div>
                                        )}
                                        {scheduleData && (
                                            <ScheduleTime
                                                id={'id_time_per_patient'}
                                                title={'Время приема одного пациента'}
                                                type={'text'}
                                                value={scheduleData.time_per_patient}
                                                onHandleChange={(val) => setScheduleData({ ...scheduleData, time_per_patient: +val })}
                                                fieldIsDisable={fieldIsDisable}
                                            />
                                        )}
                                        {errors && Object.entries(errors).map(([key, value]) => 
                                            <p style={{ color: 'red' }}>{value}</p>
                                        )}
                                    </div>
                                    {!scheduleData && (
                                        <div className="schedule__btns">
                                            <Button text={'Создать'} onHandleClick={() => {
                                                setScheduleData({
                                                    schedule: {},
                                                    time_per_patient: null,
                                                    id_doctor: userId
                                                })
                                                setOpenUpdateForm(true);
                                                setFieldIsDisable(false);
                                                setIsNewSchedule(true);
                                            }} />
                                        </div>
                                    )}
                                    {openUpdateForm && (
                                        <div className="schedule__btns">
                                            <Button text={'Сохранить'} onHandleClick={isNewSchedule ? (
                                                () => handleCreateSchedule()
                                            ) : (
                                                () => handleUpdateSchedule()
                                            )}/>
                                            <Button modify={'btn--cancel'} text={'Отмена'} onHandleClick={() => {
                                                setScheduleData(JSON.parse(JSON.stringify(scheduleInitData)));
                                                setOpenUpdateForm(false);
                                                setFieldIsDisable(true);
                                                setErrors({});
                                            }}/>
                                        </div>
                                    )}
                                    {scheduleData && !openUpdateForm && (
                                        <div className="schedule__btns">
                                            <Button text={'Редактировать'} onHandleClick={() => {
                                                setOpenUpdateForm(true);
                                                setFieldIsDisable(false);
                                            }}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
            <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
        </>
    );
};

export default Schedule;
