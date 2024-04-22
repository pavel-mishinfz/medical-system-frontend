import React from 'react';
import SpezializationImage from './SpezializationImage';
import SpezializationTitle from './SpezializationTitle';
import { useNavigate } from 'react-router-dom';


export default function SpezializationItem({ data: { id, name, img } }) {
  const navigate = useNavigate();
  
  return (
    <div className="direct__list-item" onClick={() => navigate(`/specializations/${id}`)}>
      <SpezializationImage src={img} />
      <SpezializationTitle title={name} />
    </div>
  );
}