import React from 'react';
import { MenuItem } from './MenuItem';
import { Hamb } from './Hamb';


export function Menu({items}) {
  return (
    <div className="menu">
        {items.length > 0 && items.map((item, index) =>
            <MenuItem key={index} data={item}/>
        )}
        {/* <Hamb />     */}
    </div>
  );
}
