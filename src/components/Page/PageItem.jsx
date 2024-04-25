import React from 'react';
import PageInput from './PageInput';


export default function PageItem({title, body, fields, initCardData, updateCardData, openEditForm}) {
  return (
    <div className="page__field">
        <h4 className="page__field-h4">{title}</h4>
        <div className="page__field-text">
        {openEditForm && fields ?
        fields.map((field, index) =>
            <PageInput key={index} fields={field} initCardData={initCardData} updateCardData={updateCardData}/> 
        )
        : 
        body
        }
        </div>
    </div>
  );
}