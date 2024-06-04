import React, { createContext, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { getNavItems } from '../../getNavItems';


export const SidebarContext = createContext();

const Sidebar = ({ sidebarIsOpen, setSidebarIsOpen }) => {
  const navItems = getNavItems(+sessionStorage.getItem('groupId'));

  const handleOutsideClick = (e) => {
    if (sidebarIsOpen && !e.target.closest('.sidebar')) {
      setSidebarIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [sidebarIsOpen]);


  const handleLogout = async () => {
    axios.post('http://' + window.location.hostname + `:8006/auth/jwt/logout`, '', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    })
      .then(response => {
        console.log('Logout successful', response.status);
        sessionStorage.clear()
        window.location.replace('/');
      })
      .catch(error => {
        console.log('Logout failed', error);
      })
  };

  return (
    <aside className={`sidebar ${sidebarIsOpen && 'active'}`}>
      <div className="sidebar__header">
        <h2 className="sidebar__h2">Навигация</h2>
      </div>
      <hr className="sidebar__divider" />
      <SidebarContext.Provider
        value={{
          handleLogout
        }}
      >

        <Nav items={navItems} />

      </SidebarContext.Provider>
      <hr className="sidebar__divider" />
    </aside>
  );
}

export default Sidebar;