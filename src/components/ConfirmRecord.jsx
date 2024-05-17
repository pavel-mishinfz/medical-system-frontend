import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecordConfirm from './RecordPanel/RecordConfirm';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Header from './Header/Header';


const ConfirmRecord = ({currentUserData}) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const { state } = useLocation();
    const params = useParams();
    const doctorId = params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://' + window.location.hostname + `:8000/users/${doctorId}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setDoctor(response.data);
            } catch (error) {
                console.error('Get Doctor Error:', error);
            }
          };
          
          if (doctorId) {
            fetchData();
          }
      }, []);

    return (
        <>
            {currentUserData && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <div className="section">
                            <div className="record-confirm__wrap">
                                <Header title={'Запись на прием к врачу'} />
                                {doctor && state && (
                                    <RecordConfirm doctor={doctor} user={currentUserData} day={state.day} time={state.time} />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ConfirmRecord;