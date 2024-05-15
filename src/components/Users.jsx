import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import UsersList from './User/UsersList';
import Header from './Header/Header';
import { useNavigate } from 'react-router-dom';


export const UsersContext = createContext();

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+ window.location.hostname + `:8000/users`);
    
        setUsers(response.data.filter(user => user.id !== sessionStorage.getItem('userId') && user.is_superuser === false));

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
            <Header title={'Список пользователей'}/>
            <div className="filter" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
              <select name="filter-users" onChange={(e) => setFilter(+e.target.value)}>
                <option value="0">Все пользователи</option>
                <option value="1">Врачи</option>
                <option value="2">Пациенты</option>
              </select>
            </div>
            <UsersContext.Provider
            value={{
              navToUserProfile: (userId) => navigate(`/users/${userId}`)
            }}
            >

            {users.length > 0 && filter === 0 && 
              <UsersList users={users}/>
            }

            {users.length > 0 && filter === 1 && 
              <UsersList users={users.filter(user => user.specialization_id !== null)}/>
            }

            {users.length > 0 && filter === 2 && 
              <UsersList users={users.filter(user => user.specialization_id === null)}/>
            }

            </UsersContext.Provider>
          </div>
        </section>
    </div>
    </>
  );
}

export default Users;