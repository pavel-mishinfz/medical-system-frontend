import React, { useContext } from 'react';
import { SliderContext } from "./Slider";

export default function Arrows() {
  const { changeSlide } = useContext(SliderContext);

  return (
    <div className="slider__arrows">
        <div className="slider__arrows-item left" onClick={() => changeSlide(-1)}>
          <img src="/img/slider/arrow.png" alt="arrow-left" />
        </div>
        <div className="slider__arrows-item right" onClick={() => changeSlide(1)}>
          <img src="/img/slider/arrow.png" alt="arrow-right" />
        </div>
    </div>
  );
}