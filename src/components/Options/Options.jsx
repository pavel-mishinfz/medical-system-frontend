import React from 'react';
import OptionItem from './OptionItem';


export default function Options({optionsData}) {
  return (
    <div className="page__options">
      {optionsData.map((data, index) => 
        <OptionItem key={index} data={data}/>
      )}
    </div>
  );
}