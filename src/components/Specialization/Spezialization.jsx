import React from 'react';
import SpezializationImage from './SpezializationImage';
import SpezializationTitle from './SpezializationTitle';


export default function Spezialization({ data: { id, name, img } }) {
  return (
    <div className="direct__list-item">
      <SpezializationImage src={img} />
      <SpezializationTitle title={name} />
    </div>
  );
}