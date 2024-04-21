import React from 'react';
import { Link } from 'react-router-dom';


export function MenuItem({data: {title, nav}}) {
  return (
    <button className="menu__item">
        <Link to={nav}>{title}</Link>
    </button>
  );
}
