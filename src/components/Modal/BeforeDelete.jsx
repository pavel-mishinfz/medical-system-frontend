import React from 'react';
import Button from '../Button/Button';


export default function BeforeDelete({title, handleDelete, setOpenConfirmForm}) {
    
    return (
        <div className="modal">
            <div className="before-delete">
                <div className="before-delete__title">{title}</div>
                <div className="before-delete__text">Вы действительно хотите удалить запись? Данное действие удалит данные навсегда.</div>
                <div className="before-delete__btns">
                    <Button text={'Удалить'} onHandleClick={() => { handleDelete(); setOpenConfirmForm(false) }} />
                    <Button modify={'btn--cancel'} text={'Отмена'} onHandleClick={() => setOpenConfirmForm(false)} />
                </div>
            </div>
        </div>
    );
};

