import React, { useContext } from 'react';
import UserImage from './UserImage';
import UserInfo from './UserInfo';
import { UsersContext } from '../Users';

const User = ({userData}) => {

  const { navToUserProfile } = useContext(UsersContext) || {};

  return (
    <div className="doctor">
        <UserImage src={userData.img} handleClick={navToUserProfile && ( () => navToUserProfile(userData.id) )}/>
        <UserInfo data={userData}/>
    </div>
  );
}

export default User;