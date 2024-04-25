import React from 'react';


export default function PageInput({fields: {title, type, name, subname, value, options}, initCardData, updateCardData}) {

    const handleOnChange = (e) => {
        let value = e.target.value ? e.target.value : null;
        if (subname) {
            if (name === 'address') {
                updateCardData({...initCardData, [e.target.name]: {...initCardData.address, [subname]: value}});
            }
            if (name === 'passport') {
                updateCardData({...initCardData, [e.target.name]: {...initCardData.passport, [subname]: value}})
            }
            if (name === 'disability') {
                updateCardData({...initCardData, [e.target.name]: {...initCardData.disability, [subname]: value}})
            }
        } else {
            updateCardData({...initCardData, [e.target.name]: value})
        }
    }

    return (
        <>
        <div className="page__input">
            <p className="page__input-text" style={title === null ? {display: 'none'} : {}}>{title}</p>
            {type === 'select' ? 
            <select name={name} onChange={(e) => handleOnChange(e)}>
                {Object.entries(options).map(([key, optionValue]) =>
                <option key={key} value={key} selected={value == key}>{optionValue}</option>
                )}
            </select>
            :
            <input type={type} value={value} name={name} onChange={(e) => handleOnChange(e)}/>
            }
        </div>
        </>
    );
}