import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Button from './Button/Button';
import ProfileImg from './Profile/ProfileImg';
import ProfileInfo from './Profile/ProfileInfo';
import Options from './Options/Options';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const params = useParams();
  const userId = params.id ? params.id : 'me';

  const handleUpdateProfile = async () => {

    const requestBody = userData;

    try {
        const response = await axios.patch('http://'+ window.location.hostname + `:8000/users/${userId}`, requestBody, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
        setUserData(response.data);
        setIsUpdateForm(false);
    } catch(error) {
        console.error('Update User Error:', error);
    }
  }

  const handleOutsideClick = (e) => {
    if (optionsIsOpen && !e.target.closest('.page__options-item')) {
      setOptionsIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [optionsIsOpen])

  return (
    <>
    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
    <div className="container">
      <Head
        setSidebarIsOpen={setSidebarIsOpen}
        setUserData={(data) => setUserData(data)}
      />
      {userData && (
        <section className="section section--profile">
          <div className="profile">
            <div className="profile__left">
              <ProfileImg userData={userData} setUserData={data => setUserData(data)} userId={userId} />
              <button className="page__open-options" onClick={() => setOptionsIsOpen(true)}>
                <p>...</p>
              </button>
              {optionsIsOpen && (
                <Options
                  optionsData={[
                    {
                      src: "/img/options/at-sign.svg",
                      text: "Изменить почту",
                      onHandleClick: () => navigate('/change-email', { state: { email: userData.email } })
                    },
                    {
                      src: "/img/options/key.svg",
                      text: "Изменить пароль",
                      onHandleClick: () => navigate('/change-password', { state: { email: userData.email } })
                    }
                  ]}
                />
              )}
            </div>
            <div className="profile__right">
              <ProfileInfo
                userInfo={userData}
                setUserInfo={setUserData}
                isUpdateForm={isUpdateForm}
              />
            </div>
            <div className="profile__btns">
              {isUpdateForm ?
                <>
                  <Button text={'Сохранить'} onHandleClick={handleUpdateProfile} />
                  <Button modify={'btn--cancel'} text={'Отмена'} onHandleClick={() => setIsUpdateForm(false)} />
                </>
                :
                <Button text={'Редактировать профиль'} onHandleClick={() => setIsUpdateForm(true)} />
              }
            </div>
          </div>
        </section>
      )}
    </div>
    <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
    </>
  );
}

export default Profile;
