import React, { useState, createContext } from 'react';
import moment from 'moment';
import PageItem from './PageItem';
import Button from '../Button/Button';


export const PageContext = createContext();

export default function Page({pageData, pageItems, updatePage, handlePageData, isPageDiary}) {
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleSavePageData = () => {
    handlePageData();
    setOpenEditForm(false);
  }
 
  return (
    <>
    <div className="page">
        <div className="page__options">
          <div className="page__options-item" onClick={() => setOpenEditForm(true)}>
            <img src="/img/options/edit.svg" alt="edit card" />
          </div>
          <div className="page__options-item">
            <img src="/img/options/delete.svg" alt="delete card" />
          </div>
        </div>
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
              />

            </PageContext.Provider>
        )}
        <div className="page__create-date">
          {isPageDiary ? 
          <p>{moment(pageData.create_date).utc(true).format('DD/MM/YYYY HH:mm')}</p>
          :
          <p>{moment(pageData.create_date).utc(true).format('DD/MM/YYYY')}</p>
          }
        </div>
    </div>
    {openEditForm && (
      <div className="medcard__btns">
        <Button text={'Сохранить'} onHandleClick={handleSavePageData}/>
        <Button modify={'btn--cancel'} text={'Отменить'} onHandleClick={() => setOpenEditForm(false)} />
      </div>
    )}
    </>
  );
}