import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { calculateExperience, formatExperience } from '../User/UserInfo';
import Input from '../Form/Input';
import Select from '../Form/Select';


const ProfileInfo = ({userInfo, setUserInfo, errors, isUpdateForm, isAdmin, isDoctor}) => {
  const experience = calculateExperience(userInfo.date_employment);
  const age = getAgeFromBirthDate(userInfo.birthday);
  const [specializationsList, setSpecializationsList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + window.location.hostname + `:8006/specializations`)
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
            error={errors['name']}
          />
          <Input 
            type={'text'}
            htmlFor={'surname'}
            placeholder={'Фамилия'}
            title={'Фамилия'}
            value={userInfo.surname}
            onChangeInput={(e) => setUserInfo({...userInfo, surname: e.target.value})}
            error={errors['surname']}
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
            error={errors['birthday']}
          />
          {isAdmin && isDoctor && specializationsList && (
            <>
            <Input
              type={'date'}
              htmlFor={'dateEmployment'}
              placeholder={'Дата начала работы'}
              title={'Дата начала работы'}
              value={userInfo.date_employment}
              onChangeInput={(e) => setUserInfo({ ...userInfo, date_employment: e.target.value })}
              error={errors['date_employment']}
            />
            <Select 
              options={specializationsList}
              value={userInfo.specialization_id}
              onChangeSelect={specId => setUserInfo({...userInfo, specialization_id: specId})}
              error={errors['specialization_id']}
            />
            <Input 
              type={'text'}
              htmlFor={'description'}
              placeholder={'Описание'}
              title={'Описание'}
              value={userInfo.desc}
              onChangeInput={(e) => setUserInfo({...userInfo, desc: e.target.value})}
              error={errors['desc']}
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


export function getAgeFromBirthDate(birthDate) {
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

export function getTextAge(age) {
  if (age % 10 === 1 && age % 100 !== 11) {
    return 'год';
  } else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
    return 'года';
  } else {
    return 'лет';
  }
}