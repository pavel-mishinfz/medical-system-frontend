import React from 'react';


export function Hamb({setSidebarIsOpen}) {

  return (
    <>
      <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
      <label htmlFor="burger-checkbox" name="schedule" className="burger" onClick={() => setSidebarIsOpen(true)}></label>
    </>
  );
}