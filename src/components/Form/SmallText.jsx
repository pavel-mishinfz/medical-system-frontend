import React from 'react';
import { Link } from 'react-router-dom';


export default function SmallText({modify, text, nav: {addr, addrText}}) {
  return (
    <div className={`form__small ${modify}`}>
        <small className="form__small-text">
            {text}
            <Link to={addr}>{addrText}</Link>
        </small>
    </div>
  );
}
