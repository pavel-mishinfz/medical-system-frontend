import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { calculateExperience, formatExperience } from '../User/UserInfo';
import Input from '../Form/Input';
import Select from '../Form/Select';


const ProfileInfo = ({userInfo, setUserInfo, isUpdateForm}) => {
  const experience = calculateExperience(userInfo.date_employment);
  const age = getAgeFromBirthDate(userInfo.birthday);
  const [specializationsList, setSpecializationsList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + window.location.hostname + `:8000/specializations`)
        setSpecializationsList(response.data);
      } catch (error) {
        console.error('Get Specializations List Error:', error);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="profile__info">
      {isUpdateForm ? (
        <>
          <Input 
            type={'text'}
            htmlFor={'name'}
            placeholder={'Имя'}
            title={'Имя'}
            value={userInfo.name}
            onChangeInput={(e) => setUserInfo({...userInfo, name: e.target.value})}
          />
          <Input 
            type={'text'}
            htmlFor={'surname'}
            placeholder={'Фамилия'}
            title={'Фамилия'}
            value={userInfo.surname}
            onChangeInput={(e) => setUserInfo({...userInfo, surname: e.target.value})}
          />
          <Input 
            type={'text'}
            htmlFor={'patronymic'}
            placeholder={'Отчество'}
            title={'Отчество'}
            value={userInfo.patronymic}
            onChangeInput={(e) => setUserInfo({...userInfo, patronymic: e.target.value})}
          />
          <Input 
            type={'date'}
            htmlFor={'birthday'}
            placeholder={'Дата рождения'}
            title={'Дата рождения'}
            value={userInfo.birthday}
            onChangeInput={(e) => setUserInfo({...userInfo, birthday: e.target.value})}
          />
          {userInfo.is_superuser && specializationsList && (
            <>
            <Select 
              options={specializationsList}
              value={userInfo.specialization_id}
              onChangeSelect={specId => setUserInfo({...userInfo, specialization_id: specId})}
            />
            <Input 
              type={'text'}
              htmlFor={'description'}
              placeholder={'Описание'}
              title={'Описание'}
              value={userInfo.desc}
              onChangeInput={(e) => setUserInfo({...userInfo, desc: e.target.value})}
            />
            </>
          )}
        </>
      )
      :
      <>
        <div className="profile__info-name">{userInfo.surname} {userInfo.name} {userInfo.patronymic}</div>
        <div className="profile__info-age">{age} {getTextAge(age)}</div>
        {userInfo.specialization_id && (<div className="profile__info-spec">{specializationsList && specializationsList.find(item => item.id === userInfo.specialization_id).name}</div>)}
        {userInfo.specialization_id && (<div className="profile__info-desc">{userInfo.desc}</div>)}
        {userInfo.specialization_id && (<div className="profile__info-exp">Стаж {experience > 0 ? experience : 'меньше'} {formatExperience(experience)}</div>)}
        <div className="profile__info-email">{userInfo.email}</div>
      </>}
      
    </div>
  );
}

export default ProfileInfo;


function getAgeFromBirthDate(birthDate) {
  const today = new Date();
  const year = birthDate.substr(0, 4);
  const month = birthDate.substr(5, 2) - 1;
  const day = birthDate.substr(8);

  let age = today.getFullYear() - year;

  if (today.getMonth() < month ||
      (today.getMonth() === month && today.getDate() < day)) {
      age--;
  }

  return age;
}

function getTextAge(age) {
  if (age % 10 === 1) {
      return 'год';
  }
  if (age % 10 === 2 || age % 10 === 3 || age % 10 === 4) {
      return 'года';
  }
  return 'лет';
}