import React from 'react';


export default function SpezializationImage({ src }) {
  return (
    <div className="direct__img">
        <img src={`http://localhost:8006/${src}`} alt=""/>
    </div>
  );
}