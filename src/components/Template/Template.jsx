import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Button from '../Button/Button';
import TemplateHeader from './TemplateHeader';
import TemplateRow from './TemplateRow';
import TemplatePage from './TemplatePage';


const Template = ({template, setAddNewTemplate, setTemplates}) => {
    const [readTemplate, setReadTemplate] = useState(template ? true : false);
    const [templateName, setTemplateName] = useState(template ? template.name : '');
    const field = {
        title: "",
        name: "",
        type: "text",
        value: "",  
        options: null
    }
    const row = {
        title: "",
        body: "",
        divider: "",
        fields: [field],
    }
    const [rows, setRows] = useState(template ? template.structure.map(tmp => ({ id: uuid(), row: tmp })) : []);
    const [errors, setErrors] = useState({});

    const handleCreateTemplate = async () => {
        const requestBody = {
            name: templateName,
            structure: rows.map(item => item.row)
        }

        try {
            const response = await axios.post('http://' + window.location.hostname + `:5000/templates`, requestBody, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            window.location.reload();
        } catch (error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                if (error.loc.length == 2) {
                    errorDetails['name'] = error.msg.split(',')[1];    
                } else {
                    errorDetails['any'] = error.msg.split(',')[1];
                }
            });
            setErrors(errorDetails);
        }
    }

    const handleUpdateTemplate = async () => {
        const requestBody = {
            name: templateName,
            structure: rows.map(item => item.row)
        }

        try {
            const response = await axios.put('http://' + window.location.hostname + `:5000/templates/${template.id}`, requestBody, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            setTemplates(response.data);
            setReadTemplate(true);
        } catch (error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                if (error.loc.length == 2) {
                    errorDetails['name'] = error.msg.split(',')[1];    
                } else {
                    errorDetails['any'] = error.msg.split(',')[1];
                }
            });
            setErrors(errorDetails);
        }
    }

    const handleDeleteTemplate = async () => {
        try {
            const response = await axios.delete('http://' + window.location.hostname + `:5000/templates/${template.id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            setTemplates(null);
            setReadTemplate(true);
        } catch (error) {
            console.error('Update Template Error:', error);
        }
    }

    return (
        <>
        {(!template || !readTemplate) && (
            <>
            <div className="template">
                <TemplateHeader value={templateName} setValue={setTemplateName} error={errors['name']}/>
                {rows.map((elem, index) => (
                    <div className="template__structure" key={elem.id}>
                        <div className="template__structure-delete">
                            <img src="/img/options/delete-square.svg" alt="delete" onClick={() => {
                                const updatedRows = rows.filter(row => row.id !== elem.id);
                                setRows(updatedRows);
                            }} />
                        </div>
                        <TemplateRow title={'Заголовок'} type={'text'} name={'title'} value={elem.row.title} onRowChange={(title) => {
                            elem.row.title = title;
                            const updatedItem = { ...rows[index], row: elem.row };
                            const updatedArray = [...rows];
                            updatedArray[index] = updatedItem;
                            setRows(updatedArray);
                        }} />
                        <TemplateRow title={'Разделитель'} type={'text'} name={'divider'} value={elem.row.divider} onRowChange={(divider) => {
                            elem.row.divider = divider;
                            const updatedItem = { ...rows[index], row: elem.row };
                            const updatedArray = [...rows];
                            updatedArray[index] = updatedItem;
                            setRows(updatedArray);
                        }} />
                        <TemplateRow
                            title={'Поля'}
                            img={<img src="/img/options/add-square.svg" alt="add" onClick={() => {
                                const updatedRows = [...rows];
                                updatedRows[index].row.fields.push(field);
                                setRows(updatedRows);
                            }} />}
                            deleteField={(fieldIndex) => {
                                const updatedRows = [...rows];
                                updatedRows[index].row.fields.splice(fieldIndex, 1);
                                setRows(updatedRows);
                            }}
                            fields={elem.row.fields}
                            onRowChange={(fieldIndex, fieldName, value) => {
                                const updatedRows = [...rows];
                                updatedRows[index].row.fields[fieldIndex][fieldName] = value;
                                setRows(updatedRows);
                            }}
                        />
                    </div>
                ))}
                {errors && errors['any'] && (
                    <p style={{color: 'red'}}>{errors['any']}</p>
                )}
                <div className="template__add">
                    <Button text={'+ Добавить строку'} onHandleClick={() => setRows([...rows, { id: uuid(), row: row }])} />
                </div>
            </div>
            <div className="template__btns">
                <Button text={'Сохранить'} onHandleClick={template ? handleUpdateTemplate : handleCreateTemplate} />
                <Button modify={'btn--cancel'} text={'Отменить'} onHandleClick={() => {
                    if (template) {
                        setReadTemplate(true);
                    } else {
                        setAddNewTemplate(false);
                    }
                }} />
            </div>
            </>
        )}
        {(template && readTemplate) && (
        <TemplatePage 
            template={template} 
            templateName={template.name}
            readTemplate={readTemplate} 
            setReadTemplate={state => setReadTemplate(state)}
            handleDeleteTemplate={handleDeleteTemplate}
        />)}
        </>
    );
}

export default Template;
