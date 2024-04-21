import React from 'react';
import { Link } from 'react-router-dom';


export default function NavItem({ data: { img, url, title } }) {
  return (
    <li className="nav__list-item">
        <img src={img} alt={title} />
        <Link to={url}>{title}</Link>
    </li>
  );
}