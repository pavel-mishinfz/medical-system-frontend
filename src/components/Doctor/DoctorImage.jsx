import React from 'react';

export default function DoctorImage({src}) {
  return (
      <div className="doctor__img">
          <img src={`http://localhost:8000/${src}`} alt="avatar" />
      </div>
  );
}