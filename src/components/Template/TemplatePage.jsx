import React, { useState } from 'react';
import TemplateHeader from './TemplateHeader';
import Button from '../Button/Button';


const TemplatePage = ({template, templateName, readTemplate, setReadTemplate, handleDeleteTemplate}) => {
    const [openConfirmForm, setOpenConfirmForm] = useState(false);

    return (
        <>
        <div className="page">
            <TemplateHeader 
                value={templateName} 
                readTemplate={readTemplate} 
                setReadTemplate={setReadTemplate} 
                beforeDeleteTemplate={() => setOpenConfirmForm(true)}
            />
            {template.structure.map(item => {
                return item.fields.map((field, index) => 
                    <div className="page__row" key={index}>
                        <h4 className="page__row-h4" style={index === 0 ? {} : {display: 'none'}}>{item.title}</h4>
                        <div className="page__row-text">
                            <div className="page__field">
                                <p className="page__field-title">{field.title}</p>
                                {field.type === 'select' && field.options && (
                                    <select disabled defaultValue={field.options[0].id} style={{opacity: '0.7', pointerEvents: 'none'}}>
                                        <option>{field.options[0].name}</option>
                                    </select>
                                )}
                                {field.type === 'textarea' && (
                                    <textarea disabled value={field.value} style={{ resize: 'none', minHeight: '200px', opacity: '0.7', backgroundColor: '#f2f8ff', pointerEvents: 'none' }} />
                                )}
                                {(field.type === 'date' || field.type === 'text') && (
                                    <input type={field.type} value={field.value} disabled style={{opacity: '0.7', backgroundColor: '#f2f8ff', pointerEvents: 'none'}}/>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {openConfirmForm && (
            <div className="modal">
                <div className="before-delete">
                    <div className="before-delete__title">Удалить страницу</div>
                    <div className="before-delete__text">Вы действительно хотите удалить запись? Данное действие удалит данные навсегда.</div>
                    <div className="before-delete__btns">
                        <Button text={'Удалить'} onHandleClick={handleDeleteTemplate} />
                        <Button modify={'btn--cancel'} text={'Отмена'} onHandleClick={() => setOpenConfirmForm(false)} />
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default TemplatePage;
