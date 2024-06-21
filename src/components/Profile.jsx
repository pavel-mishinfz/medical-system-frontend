import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Button from './Button/Button';
import ProfileImg from './Profile/ProfileImg';
import ProfileInfo from './Profile/ProfileInfo';
import Options from './Options/Options';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import BeforeDelete from './Modal/BeforeDelete';


const Profile = ({currentUserData}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const [errors, setErrors] = useState({});


  const params = useParams();
  const userId = params.id ? params.id : 'me';

  let options = [
    {
      src: "/img/options/at-sign.svg",
      text: "Изменить почту",
      onHandleClick: () => navigate('/change-email', { state: { id: userId, email: currentUserData.email } })
    },
    {
      src: "/img/options/key.svg",
      text: "Изменить пароль",
      onHandleClick: () => navigate('/change-password', { state: { id: userId, email: userData.email } })
    }
  ]

  useEffect(() => {
    
    const fetchData = async () => {
      try {
          const response = await axios.get('http://'+ window.location.hostname + `:5000/users/${userId}`, {
                          headers: {
                              Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                          },
                      });
          setUserData(response.data);
      } catch(error) {
          console.error('Get User Error:', error);
      }
    } 

    if (userId === 'me') {
      setUserData(currentUserData);
    } else {
      fetchData();
    }
  }, []);

  const handleUpdateProfile = async () => {

    const requestBody = userData;

    try {
        const response = await axios.patch('http://'+ window.location.hostname + `:5000/users/${userId}`, requestBody, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
        setUserData(response.data);
        setIsUpdateForm(false);
        setErrors({});
    } catch(error) {
        const errorData = error.response.data;
        const errorDetails = {};
        errorData.detail.forEach((error) => {
            const field = error.loc[1];
            errorDetails[field] = error.msg.split(',')[1];
        });
        setErrors(errorDetails);
    }
  }

  const handleDeleteUser = async () => {

    try {
        const response = await axios.delete('http://'+ window.location.hostname + `:5000/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
        window.location.replace('/users');
    } catch(error) {
        console.error('Delete User Error:', error);
    }
  }

  const handleConfirmUser = async () => {

    const requestBody = {
      email: userData.email
    }

    axios.post('http://' + window.location.hostname + ':5000/auth/request-verify-token', requestBody)
      .then(response => {
        console.log('Request verify successful:', response.status);
      })
      .catch(error => {
        console.error('Request verify failed:', error);
      });
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
      {currentUserData && (
        <>
          <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
          <div className="container">
            <Head
              setSidebarIsOpen={setSidebarIsOpen}
              isAuthenticated
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
                        optionsData={currentUserData.is_superuser ? (
                          [...options, {
                            src: "/img/options/verify.svg",
                            text: "Подтвердить аккаунт",
                            isVefiry: userData.is_verified,
                            onHandleClick: () => { handleConfirmUser(); setOptionsIsOpen(false) }
                          }, {
                            src: "/img/options/delete.svg",
                            text: "Удалить пользователя",
                            onHandleClick: () => setOpenConfirmForm(true)
                          }]
                        ) : (
                          options
                        )}
                      />
                    )}
                  </div>
                  <div className="profile__right">
                    <ProfileInfo
                      userInfo={userData}
                      setUserInfo={setUserData}
                      isUpdateForm={isUpdateForm}
                      isAdmin={currentUserData.is_superuser}
                      isDoctor={userData.specialization_id}
                      errors={errors}
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
                {openConfirmForm && (
                  <BeforeDelete title={'Удалить пользователя'} handleDelete={handleDeleteUser} setOpenConfirmForm={setOpenConfirmForm}/>
                )}
              </section>
            )}
          </div>
        </>
      )}
      <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
    </>
  );
}

export default Profile;
