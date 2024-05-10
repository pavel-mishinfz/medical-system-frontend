import React, { useContext, useState } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import { ChangeEmailContext } from '../ChangeEmail';
import Timer from '../Timer/Timer';
import { useNavigate } from 'react-router-dom';


const Card = ({title, subtitle, fields, modify, textBtn, handleClick}) => {
    const navigate = useNavigate();
    const { confirmCode } = useContext(ChangeEmailContext) || null;

    const [disabledInput, setDisabledInput] = useState(false);

    const handleChangeConfirmCode = (value) => {
        if (value.length >= 6) {
            axios.post('http://' + window.location.hostname + `:8000/check_confirm_code?code=${value}`, '', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            })
            .then(response => {
                console.log('Request verify successful:', response.status);
                navigate('/');
            })
            .catch(error => {
                console.error('Request verify failed:', error);
            });
        }
    }

    return (
        <div className="card">
            <div className="card__header">
                <h1 className="card__title">{title}</h1>
                <p className="card__subtitle">{subtitle}</p>
                {fields}
            </div>
            {confirmCode ? 
            <div className='confirm-code'>
                <label htmlFor="id_confrim_code">Код подтверждения</label>
                <input disabled={disabledInput} maxLength={6} onChange={(e) => handleChangeConfirmCode(e.target.value)} type='text' id="id_confrim_code"></input>
                <Timer handle={handleClick} disabledInput={state => setDisabledInput(state)}/>
            </div>
            :
            <div className="card__btn">
                <Button modify={modify} text={textBtn} onHandleClick={handleClick} />
            </div>
            }
        </div>
    );
};

export default Card;