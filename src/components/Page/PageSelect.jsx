import React, { useContext } from 'react';
import { PageContext } from './Page';


export default function PageSelect({selectData: {name, value, options}}) {
    console.log(options);
    const { pageData, updatePage } = useContext(PageContext);

    return (
        <select defaultValue={+value} name={name} onChange={(e) => updatePage({...pageData, [e.target.name]: e.target.value})}>
            {options.map(option =>
            <option key={option.id} value={option.id}>{option.name}</option>
            )}
        </select>
    );
}