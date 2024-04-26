import React, { useContext } from 'react';
import PageField from './PageField';
import { PageContext } from './Page';


export default function PageItem({title, body, fields, openEditForm}) {
  const { isPageDiary } = useContext(PageContext);

  return (
    <div className={isPageDiary ? 'page__row page__row--diary' : 'page__row'}>
        <h4 className="page__row-h4">{title}</h4>
        <div className="page__row-text">
        {openEditForm && fields ?
        fields.map((field, index) =>
            <PageField key={index} fieldData={field}/>
        )
        : 
        body
        }
        </div>
    </div>
  );
}