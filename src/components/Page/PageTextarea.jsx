import React, { useContext } from 'react';
import { PageContext } from './Page';


export default function PageTextarea({textareaData: {type, name, subname, value}}) {

    const { pageData, updatePage } = useContext(PageContext);


    const handleOnChange = (e) => {
        let value = e.target.value ? e.target.value : null;
        if (subname) {
            if (name === 'address') {
                updatePage({...pageData, [e.target.name]: {...pageData.address, [subname]: value}});
            }
            if (name === 'passport') {
                updatePage({...pageData, [e.target.name]: {...pageData.passport, [subname]: value}});
            }
            if (name === 'disability') {
                updatePage({...pageData, [e.target.name]: {...pageData.disability, [subname]: value}});
            }
        } else {
            updatePage({...pageData, [e.target.name]: value})
        }
    }

    return (
        <textarea value={value ? value : ''} name={name} onChange={(e) => handleOnChange(e)} style={{minHeight: '200px'}}/>
    );
}