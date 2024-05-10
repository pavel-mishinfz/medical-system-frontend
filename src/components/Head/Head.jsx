import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu } from './Menu';
import Title from './Title';


const Head = ({setSidebarIsOpen, setUserData, setSpecialization}) => {
    const menuItems = [
        {
            title: 'Регистрация',
            nav: '/register'
        },
        {
            title: 'Войти',
            nav: '/login'
        }
    ];

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [renderHead, setRenderHead] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://' + window.location.hostname + ':8000/users/me', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
          });
          
          const specId = response.data.specialization_id; 
          setUserData(response.data);
  
          if (setSpecialization) {
            try {
              const response = await axios.get('http://' + window.location.hostname + `:8000/specializations/${specId}`, {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
              });

              setSpecialization(response.data);
            } catch (error) {
              console.error('Get Specialization Error:', error);
            }
          }

          setIsAuthorized(true);
        } catch (error) {
          console.error('Get User Error:', error);
        }
        
        setRenderHead(true);
      };
  
      fetchData();
    }, [])

    return (
        <>
        {renderHead && (
            <header className="header">
                <Title />
                {isAuthorized ?
                    <Menu items={[]} setSidebarIsOpen={setSidebarIsOpen} />
                    :
                    <Menu items={menuItems} setSidebarIsOpen={setSidebarIsOpen} />
                }
            </header>
        )}
        </>
    );
}

export default Head;