import React from 'react';

export default function SlideImage({ src, alt }) {
  return (
    <div className="slider-item__left">
        <img className="slider-item__img" src={src} alt={alt} />
    </div>
  );
}