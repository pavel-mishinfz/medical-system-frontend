import React, { useContext } from 'react';
import { SliderContext } from "./Slider";


export default function Dot({ number }) {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={`slider__dots-item ${slideNumber === number ? "active" : ""}`}
      onClick={() => goToSlide(number)}
    />
  );
}