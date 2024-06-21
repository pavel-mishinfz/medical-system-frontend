import React from 'react';


export default function SpezializationImage({ src }) {
  return (
    <div className="direct__img">
        <img src={`http://${window.location.hostname}:5000/${src}`} alt=""/>
    </div>
  );
}
