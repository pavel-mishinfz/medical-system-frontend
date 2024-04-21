import React from 'react';

export default function SlideTitle({ title, desc }) {
  return (
    <div className="slider-item__right">
        <div className="slider-item__desc">
            <h2 className="slider-item__title">{title}</h2>
            <p className="slider-item__text">{desc}</p>
        </div>
    </div>
  );
}