import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import DoctorList from './Doctor/DoctorList';
import Register from './Register';


const Specialization = () => {
  const params = useParams();
  const specId = params.id;

  const [spec, setSpec] = useState();
  const [doctors, setDoctors] = useState([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+ window.location.hostname + `:8000/specializations/${specId}`);
    
        setSpec(response.data.name);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <>
    <Sidebar />
    <div className="container">
        <Head />
        <section className="section">
          <div className="spec">
            <div className="spec__header">
              {spec && (
                <h2 className="spec__h2">{spec}</h2>
              )}
            </div>
            {doctors.length > 0 && (
              <DoctorList doctors={doctors} openRegisterModal={() => setOpenRegisterModal(true)}/>
            )}
          </div>
        </section>
    </div>
    {sessionStorage.getItem('authToken') === null && openRegisterModal && (
      <Register modify={'modal'} isOpenModal={openRegisterModal} closeModal={() => setOpenRegisterModal(false)}/>
    )}
    </>
  );
}

export default Specialization;