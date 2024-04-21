import React from 'react';
import SlideTitle from "./SlideTitle";
import SlideImage from "./SlideImage";


export default function Slide({ data: { url, title, desc } }) {
  return (
    <div className="slider-item">
      <SlideImage src={url} alt={title} />
      <SlideTitle title={title} desc={desc} />
    </div>
  );
}