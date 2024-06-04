import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import UsersList from './User/UsersList';
import Header from './Header/Header';


export const UsersContext = createContext();

const Users = () => {
  const [users, setUsers] = useState(null);
  const [medicalCards, setMedicalCards] = useState(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + window.location.hostname + `:8006/users/all/summary`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });

        setUsers(response.data.filter(user => user.id !== sessionStorage.getItem('userId')));

        try {
          const response = await axios.get('http://' + window.location.hostname + `:8006/cards`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
          });
  
          setMedicalCards(response.data);
  
        } catch (error) {
          console.log(error);
        }

      } catch (error) {
        console.log(error);
      }

    }
    
    fetchData();
  }, [])


  return (
    <>
      {users && medicalCards && (
        <>
          <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
          <div className="container">
            <Head
              setSidebarIsOpen={setSidebarIsOpen}
              isAuthenticated
            />
            <section className="section">
              {users.length > 0 && (
                <div className="users">
                  <Header title={'Список пользователей'} />
                  <div className="filter" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <select name="filter-users" onChange={(e) => setFilter(+e.target.value)}>
                      <option value="0">Все пользователи</option>
                      <option value="1">Врачи</option>
                      <option value="2">Пациенты</option>
                      <option value="3">Новые пациенты</option>
                    </select>
                  </div>
                  <UsersContext.Provider
                    value={{
                      navToUserProfile: (userId) => window.location.replace(`/users/${userId}`)
                    }}
                  >

                    {filter === 0 &&
                      <UsersList users={users} medicalCards={medicalCards} isAdminUsersList/>
                    }

                    {filter === 1 &&
                      <UsersList users={users.filter(user => user.specialization !== null)} isAdminUsersList/>
                    }

                    {filter === 2 &&
                      <UsersList users={users.filter(user => user.specialization === null && medicalCards.find(card => card.id_user === user.id))} medicalCards={medicalCards}/>
                    }

                    {filter === 3 &&
                      <UsersList users={users.filter(user => user.specialization === null && !medicalCards.find(card => card.id_user === user.id))} medicalCards={medicalCards}/>
                    }

                  </UsersContext.Provider>
                </div>
              )}
            </section>
          </div>
        </>
      )}
      <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
    </>
  );
}

export default Users;