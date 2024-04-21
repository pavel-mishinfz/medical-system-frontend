import React from 'react';
import NavItem from './NavItem';


export default function Nav({ items }) {
  return (
    <nav className="nav">
        <ul className="nav__list">
            {items && items.map((item, index) =>
                <NavItem key={index} data={item}/>
            )}
        </ul>
    </nav>
  );
}