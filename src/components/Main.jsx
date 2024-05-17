import React, { useState } from 'react';
import Slider from "./Slider/Slider";
import Spezializations from './Specialization/Specializations';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';


const Main = ({isAuthenticated}) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <>
    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen}/>
    <div className="container">
        <Head 
          setSidebarIsOpen={setSidebarIsOpen}
          isAuthenticated={isAuthenticated} 
        />
        <section className="section">
            <Slider />
            <Spezializations />
        </section>
    </div>
    <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
    </>
  );
}

export default Main;