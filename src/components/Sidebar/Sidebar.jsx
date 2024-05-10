import React, { useEffect } from 'react';
import Nav from './Nav';
import { getNavItems } from '../../getNavItems';


const Sidebar = ({sidebarIsOpen, setSidebarIsOpen}) => {
    const navItems = getNavItems();

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

    return (
      <aside className={`sidebar ${sidebarIsOpen && 'active'}`}>
          <div className="sidebar__header">
              <h2 className="sidebar__h2">Навигация</h2>
          </div>
          <hr className="sidebar__divider" />
              <Nav items={navItems}/>
          <hr className="sidebar__divider" />
      </aside>
    );
}

export default Sidebar;