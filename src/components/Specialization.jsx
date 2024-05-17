import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import UsersList from './User/UsersList';
import Register from './Register';


const Specialization = ({isAuthenticated}) => {
  const params = useParams();
  const specId = params.id;

  const [spec, setSpec] = useState();
  const [doctors, setDoctors] = useState([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+ window.location.hostname + `:8000/specializations/${specId}`);
    
        setSpec(response.data);

      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get('http://'+ window.location.hostname + `:8000/users/specialization/${specId}`);
    
        setDoctors(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  }, [])

  return (
    <>
    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen}/>
    <div className="container">
        <Head 
        setSidebarIsOpen={setSidebarIsOpen} 
        isAuthenticated={isAuthenticated}
        />
        <section className="section">
          <div className="spec">
            <div className="spec__header">
              {spec && (
                <h2 className="spec__h2">{spec.name}</h2>
              )}
            </div>
            {doctors.length > 0 && (
              <UsersList users={doctors} openRegisterModal={() => setOpenRegisterModal(true)}/>
            )}
          </div>
        </section>
    </div>
    {sessionStorage.getItem('authToken') === null && openRegisterModal && (
      <Register closeModal={() => setOpenRegisterModal(false)}/>
    )}
    </>
  );
}

export default Specialization;