import React from 'react';


export default function SpezializationImage({ src }) {
  return (
    <div className="direct__img">
        <img src={`http://localhost:8000/${src}`} alt=""/>
    </div>
  );
}