import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import UsersList from './User/UsersList';
import Header from './Header/Header';
import { useNavigate } from 'react-router-dom';
import CreateAccount from './Form/CreateAccount';


const CreateUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState(0);
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+ window.location.hostname + `:8000/users`);
    
        setUsers(response.data.filter(user => user.is_superuser === false));

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
        setUserData={(data) => setUserData(data)}
        />
        <section className="section">
          <div className="users">
            <Header title={'Создание пользователя'}/>
            <div className="switch">
              <div className={`switch-item ${!isDoctor && 'active'}`} onClick={() => setIsDoctor(false)}>
                <span>Пациент</span>
              </div>
              <div className={`switch-item ${isDoctor && 'active'}`} onClick={() => setIsDoctor(true)}>
                <span>Врач</span>
              </div>
            </div>
            <CreateAccount isDoctor={isDoctor}/>
          </div>
        </section>
    </div>
    </>
  );
}

export default CreateUser;