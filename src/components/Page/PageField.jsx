import React, { useContext } from 'react';
import PageInput from './PageInput';
import PageSelect from './PageSelect';
import { PageContext } from './Page';
import PageTextarea from './PageTextarea';


export default function PageField({fieldData}) {
    const { isPageDiary } = useContext(PageContext);

    return (
        <>
        <div className={isPageDiary ? 'page__field page__field--diary' : 'page__field'}>
            <p className="page__field-title" style={fieldData.title === null ? {display: 'none'} : {}}>{fieldData.title}</p>
            {(fieldData.type === 'text' || fieldData.type === 'date') && 
            <PageInput inputData={fieldData} />
            }
            {fieldData.type === 'select' &&
            <PageSelect selectData={fieldData}/>
            }
            {fieldData.type === 'textarea' &&
            <PageTextarea textareaData={fieldData}/>
            }
        </div>
        </>
    );
}