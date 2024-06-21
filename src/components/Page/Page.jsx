import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import PageItem from './PageItem';
import Button from '../Button/Button';
import Options from '../Options/Options';
import { HealthDiaryContext } from '../HealthDiary';
import PageHeader from './PageHeader';
import { MedicalCardPagesContext } from '../MedicalCardPagesList';
import BeforeDelete from '../Modal/BeforeDelete';


export const PageContext = createContext();

export default function Page({pageData, pageItems, updatePage, handlePageData, deletePage, setAddNewPage, errors, isNewPage, ownerId}) {

  const { isPageDiary } = useContext(HealthDiaryContext) || false;
  const {title, date, doctorId, patient, isMedcardPage} = useContext(MedicalCardPagesContext) || {};

  const [openEditForm, setOpenEditForm] = useState(isNewPage);
  const [openOptions, setOpenOptions] = useState(false);
  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    const fetchData = async () => {
        if (doctorId) {
          try {
            const response = await axios.get('http://'+ window.location.hostname + `:5000/users/user/${doctorId}/summary`, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                            },
                        });         
            setDoctor(response.data);             
          } catch(error) {
              console.error('Get Doctor Error:', error);
          }
        } else {
          try {
            const response = await axios.get('http://'+ window.location.hostname + `:5000/users/me`, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                            },
                        });         
            setDoctor(response.data);             
          } catch(error) {
              console.error('Get Doctor Error:', error);
          }
        }
        
      };
      
      if (isMedcardPage) {
        fetchData();
      }
  }, [doctorId]);

  const handleSavePageData = async () => {
    const hasErrors = await handlePageData();
    if (Object.keys(hasErrors).length === 0) {
      setOpenEditForm(false);
    }
  }

  const handleCancel = () => {
    setOpenEditForm(false);
    if (setAddNewPage) {
      setAddNewPage(false);
    }
  }

  const handleEditClick = () => {
    setOpenEditForm(true);
    setOpenOptions(false);
  }

  const handleDeleteClick = () => {
    setOpenConfirmForm(true);
    setOpenOptions(false);
  }

  const handleOutsideClick = (e) => {
    if (openOptions && !e.target.closest('.page__options-item')) {
      setOpenOptions(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [openOptions])

 
  return (
    <>
    <div className="page">
        {doctor && (
          <PageHeader 
          title={title} 
          date={date} 
          doctor={`${doctor.surname} ${doctor.name} ${doctor.patronymic}`} 
          patient={`${patient.surname} ${patient.name} ${patient.patronymic}`}
          />
        )}
        {!isNewPage && (sessionStorage.getItem('userId') === ownerId) && (
          <>
            <button className="page__open-options" onClick={() => setOpenOptions(true)}>
              <p>...</p>
            </button>
          {openOptions && (
            <Options 
            optionsData={[
              {
                src: "/img/options/edit.svg",
                text: "Редактировать",
                onHandleClick: () => handleEditClick()
              },
              {
                src: "/img/options/delete.svg",
                text: "Удалить",
                onHandleClick: () => handleDeleteClick()
              }
            ]}
            />
          )}
          </>
        )}
        {pageItems.map((item, index) => 
            <PageContext.Provider
            key={index}
            value={{
              pageData: pageData,
              updatePage,
              isPageDiary: isPageDiary
            }}
            >

              <PageItem 
              title={item.title} 
              body={item.body} 
              fields={item.fields}
              openEditForm={openEditForm}
              errors={errors}
              />

            </PageContext.Provider>
        )}
        {!isNewPage && (
          <div className="page__create-date" style={isMedcardPage ? {display: 'none'} : {}}>
            {isPageDiary ? 
            <p>{moment(pageData.create_date).utc(true).format('DD/MM/YYYY HH:mm')}</p>
            :
            <p>{moment(pageData.create_date).utc(true).format('DD/MM/YYYY')}</p>
            }
          </div>
        )}
    </div>
    {openEditForm && (
      <div className="medcard__btns">
        <Button text={'Сохранить'} onHandleClick={handleSavePageData}/>
        <Button modify={'btn--cancel'} text={'Отменить'} onHandleClick={handleCancel} />
      </div>
    )}
    {openConfirmForm && (
      <BeforeDelete title={'Удалить страницу'} handleDelete={deletePage} setOpenConfirmForm={setOpenConfirmForm}/>
    )}
    </>
  );
}