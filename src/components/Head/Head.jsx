import React from 'react';
import { Menu } from './Menu';
import Title from './Title';


const Head = ({setSidebarIsOpen, setUserData, setSpecialization, isAuthenticated}) => {
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

    return (
      <header className="header">
        <Title />
        {isAuthenticated ?
          <Menu items={[]} setSidebarIsOpen={setSidebarIsOpen} />
          :
          <Menu items={menuItems} setSidebarIsOpen={setSidebarIsOpen} />
        }
      </header>
    );
}

export default Head;