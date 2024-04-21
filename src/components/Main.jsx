import React from 'react';
import Slider from "./Slider/Slider";
import Spezializations from './Specialization/Specializations';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';

const Main = () => {
  return (
    <>
    <Sidebar />
    <div className="container">
        <Head />
        <section className="section">
            <Slider />
            <Spezializations />
        </section>
    </div>
    </>
  );
}

export default Main;