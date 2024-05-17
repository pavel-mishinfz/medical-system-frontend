import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Header from './Header/Header';
import CreateAccount from './Form/CreateAccount';


const CreateUser = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isTimeout, setIsTimeout] = useState(true);

  setTimeout(function() {
    setIsTimeout(false);
  }, 3000);


  return (
    <>
      {!isTimeout && (
        <>
          <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
          <div className="container">
            <Head
              setSidebarIsOpen={setSidebarIsOpen}
              isAuthenticated
            />
            <section className="section">
              <div className="users">
                <Header title={'Создание пользователя'} />
                <div className="switch">
                  <div className={`switch-item ${!isDoctor && 'active'}`} onClick={() => setIsDoctor(false)}>
                    <span>Пациент</span>
                  </div>
                  <div className={`switch-item ${isDoctor && 'active'}`} onClick={() => setIsDoctor(true)}>
                    <span>Врач</span>
                  </div>
                </div>
                <CreateAccount isDoctor={isDoctor} />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default CreateUser;