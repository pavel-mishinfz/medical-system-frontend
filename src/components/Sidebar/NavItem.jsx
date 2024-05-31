import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarContext } from './Sidebar';


export default function NavItem({ data: { img, url, title } }) {
  const { handleLogout } = useContext(SidebarContext);

  return (
    <li className={`nav__list-item ${window.location.pathname === url ? 'active' : ''}`}>
        <img src={img} alt={title} />
        {url === '/logout' ? (
          <Link onClick={() => handleLogout()}>{title}</Link>
        ) : (
          <Link onClick={() => window.location.replace(url)}>{title}</Link>
        )}
    </li>
  );
}