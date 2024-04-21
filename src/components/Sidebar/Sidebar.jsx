import React from 'react';
import Nav from './Nav';
import { getNavItems } from '../../getNavItems';


const Sidebar = () => {
    const navItems = getNavItems();

  return (
    <aside className="sidebar">
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