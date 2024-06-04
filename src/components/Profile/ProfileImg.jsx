import React, { useState } from 'react';
import axios from 'axios';
import ImageCropper from './ImageCropper';


const ProfileImg = ({userData, setUserData, userId}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const updateAvatar = async (imgSrc) => {
    const image = dataURLtoFile(imgSrc);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.patch('http://' + window.location.hostname + `:8006/users/${userId}/image`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          ContentType: 'multipart/form-data'
        }
      });

      setUserData(response.data);
    } catch (error) {
      console.error('Update Image Error:', error);
    }
  };

  const deleteAvatar = async () => {
    try {
      const response = await axios.delete('http://' + window.location.hostname + `:8006/users/${userId}/image`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          ContentType: 'multipart/form-data'
        }
      });

      setUserData({...userData, img: null});
    } catch (error) {
      console.error('Delete Image Error:', error);
    }
  };

  return (
    <>
    <div className="profile__img">
        <img src={`http://${window.location.hostname}:8006/${userData.img ? userData.img : 'storage/img_user_none.jpg'}`} alt="user avatar" />
        {userData.img && (
            <button className='profile__img-delete' >
                <img src="/img/options/delete.svg" alt="delete" onClick={deleteAvatar}/>
            </button>
        )}
        <button className='profile__img-update'>
            <img src="/img/options/edit.svg" alt="edit" onClick={() => setModalIsOpen(true)}/>
        </button>
    </div>
    <ImageCropper 
      updateAvatar={updateAvatar}
      modalIsOpen={modalIsOpen}
      closeModal={() => setModalIsOpen(false)}
    />
    </>
  );
}

export default ProfileImg;


function dataURLtoFile(dataurl) {
  let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      extension = mime.split('/')[1],
      bstr = atob(arr[arr.length - 1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], 'avatar.' + extension, {type:mime});
}