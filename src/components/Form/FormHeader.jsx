import React from 'react';

export default function FormHeader({title}) {
  return (
    <div className="form__header">
        <h2 className="form__h2">{title}</h2>
    </div>
  );
}