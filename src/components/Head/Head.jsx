import React from 'react';
import { Menu } from './Menu';
import Title from './Title';


const Head = () => {
    const menuItems = [
        {
            title: 'Регистрация',
            nav: '#'
        },
        {
            title: 'Войти',
            nav: '#'
        }
    ];

  return (
    <>
    <header className="header">
        <Title />
        <Menu items={menuItems}/>
    </header>
    </>
  );
}

export default Head;