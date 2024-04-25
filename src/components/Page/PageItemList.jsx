import React from 'react';
import PageItem from './PageItem';


export default function PageItemList({ items, openEditForm, initCardData, updateCardData }) {
  return (
    <div className="page">
        {items.map((item, index) => 
            <PageItem 
            key={index} 
            title={item.title} 
            body={item.body} 
            fields={item.fields}
            initCardData={initCardData}
            updateCardData={updateCardData} 
            openEditForm={openEditForm}
            />
        )}
    </div>
  );
}