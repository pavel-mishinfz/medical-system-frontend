import React from 'react';
import TemplateFieldItem from './TemplateFieldItem';
import TemplateOptions from './TemplateOptions';


const TemplateFields = ({index, field, handleChange, deleteField}) => {
    const types = getTypes();

    const deleteOption = (optionId) => {
        if (field.options.length > 1) {
            const updatedOptions = field.options.filter(option => option.id !== optionId);

            const updatedRemainingOptions = updatedOptions.map(option => {
                if (option.id > optionId) {
                    return { ...option, id: option.id - 1 };
                }
                return option;
            });
            handleChange(index, 'options', updatedRemainingOptions);
        }
    };

    const addOption = () => {
        const updatedOptions = [...field.options, { id: field.options.length, name: "" }];
        handleChange(index, 'options', updatedOptions);
    };

    const handleTypeChange = (value) => {
        const updatedOptions = value === 'select' ? [{id: 0, name: ''}] : null;
        handleChange(index, 'options', updatedOptions);
        handleChange(index, 'type', value);
    };

    return (
        <div className="template__fields">
            <div className="template__fields-delete">
                <img src="/img/options/delete-square.svg" alt="delete" onClick={() => deleteField(index)} />
            </div>
            <TemplateFieldItem title={'Заголовок'} type={'text'} name={'title'} value={field.title} handleChange={(value) => handleChange(index, 'title', value)}/>
            <TemplateFieldItem title={'Тип'} type={'select'} name={'type'} value={types.find(item => item.type === field.type).id} handleChange={(value) => handleTypeChange(types.find(item => item.id === value).type)}/>
            <TemplateFieldItem title={'Идентификатор'} type={'text'} name={'name'} value={field.name} handleChange={(value) => handleChange(index, 'name', value)}/>
            {field.type !== 'select' && field.type !== 'date' && (
                <TemplateFieldItem title={'Значение по умолчанию'} type={'text'} name={'value'} value={field.value} handleChange={(value) => handleChange(index, 'value', value)}/>
            )}
            {field.type === 'select' && (
                <TemplateFieldItem 
                title={'Значения списка'}
                img={<img src="/img/options/add-square.svg" alt="add" onClick={addOption}/>}
                selectOptions={<TemplateOptions 
                                handleChange={(optionIndex, value) => {
                                    const updatedOptions = [...field.options];
                                    updatedOptions[optionIndex].name = value;
                                    handleChange(index, 'options', updatedOptions);
                                }} 
                                handleDelete={optionId => deleteOption(optionId)}
                                options={field.options}
                                />}
                />
            )}
        </div>
    );
}

export default TemplateFields;


export function getTypes() {
    return [
        {id: 1, name: 'Текстовое поле (text)', type: 'text'},
        {id: 2, name: 'Текстовое поле (textarea)', type: 'textarea'},
        {id: 3, name: 'Дата', type: 'date'},
        {id: 4, name: 'Поле выбора', type: 'select'},
    ]
}
