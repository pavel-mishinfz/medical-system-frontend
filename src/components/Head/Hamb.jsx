import React from 'react';


export function Hamb({setSidebarIsOpen}) {

  return (
    <>
    <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
    <label htmlFor="burger-checkbox" className="burger" onClick={() => setSidebarIsOpen(true)}></label>
    </>
  );
}