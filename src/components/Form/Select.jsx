import React from 'react';

export default function Select({options, value, onChangeSelect}) {

  return (
    <div className="form__fields-item">
        <select name="specialization_id" defaultValue={value} className={value ? 'active': ''} onChange={(e) => onChangeSelect(+e.target.value)}>
          {options.map(option => 
            <option key={option.id} value={option.id}>{option.name}</option>
          )}
        </select>
    </div>
  );
}