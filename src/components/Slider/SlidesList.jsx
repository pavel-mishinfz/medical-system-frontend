import React, { useContext } from 'react';
import Slide from "./Slide";
import { SliderContext } from "./Slider";


export default function SlidesList() {
  const { slideNumber, items } = useContext(SliderContext);

  return (
    <div
      className="slider__list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items && items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  );
}