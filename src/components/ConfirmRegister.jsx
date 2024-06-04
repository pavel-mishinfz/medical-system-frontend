import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from './Card/Card';


const ConfirmRegister = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const email = searchParams.get('email');

    const [textBtn, setTextBtn] = useState('Отправить повторно');
    const [modify, setModify] = useState('');

    const handleConfirm = async () => {
        const requestBody = {
            email: email
          };
      
        axios.post('http://' + window.location.hostname + ':8006/auth/request-verify-token', requestBody)
        .then(response => {
            setTextBtn('Сообщение успешно отправлено!');
            setModify('btn--success');
            setTimeout(function() {
                setTextBtn('Отпарвить повторно');
                setModify('');
            }, 3000);
            console.log('Request verify successful:', response.status);
        })
        .catch(error => {
            console.error('Request verify failed:', error);
        });
    };

    return (
        <div className="container">
            <div className="modal">
                <Card 
                title={'Регистрация прошла успешно!'} 
                subtitle={`Для подтверждения аккаунта мы отправили письмо на адрес: ${email}`}
                modify={modify}
                textBtn={textBtn}
                handleClick={handleConfirm}
                />
            </div>
        </div>
    );
};

export default ConfirmRegister;