import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import UsersList from './User/UsersList';
import Header from './Header/Header';


const Patients = () => {
  const [patients, setPatients] = useState(null);
  const [medicalCards, setMedicalCards] = useState(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + window.location.hostname + `:8000/users/all/summary`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });

        setPatients(response.data.filter(user => user.specialization === null && user.is_superuser === false));

      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get('http://' + window.location.hostname + `:8002/cards`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });

        setMedicalCards(response.data);

      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  }, [])


  return (
    <>
      {patients && (
        <>
          <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
          <div className="container">
            <Head
              setSidebarIsOpen={setSidebarIsOpen}
              isAuthenticated
            />
            <section className="section">
                <div className="users">
                  <Header title={'Список пациентов'} />
                  <UsersList users={patients} medicalCards={medicalCards}/>
                </div>
            </section>
          </div>
        </>
      )}
      <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
    </>
  );
}

export default Patients;