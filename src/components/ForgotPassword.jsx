import React, {useState} from 'react';
import axios from 'axios';
import Card from './Card/Card';
import Input from './Form/Input';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [textBtn, setTextBtn] = useState('Отправить');
    const [modify, setModify] = useState('');

    const handleRequestResetTokenPassword = async () => {
        const requestBody = {
          email: email
        };

        axios.post('http://' + window.location.hostname + ':5000/auth/forgot-password', requestBody)
        .then(response => {
            setTextBtn('Сообщение успешно отправлено!');
            setModify('btn--success');
            setTimeout(function() {
                setTextBtn('Отправить');
                setModify('');
            }, 3000);
            console.log('Request reset token passwrod successful:', response.status);
        })
        .catch(error => {
            console.error('Request reset token passwrod  failed:', error);
        });
    };

    return (
        <div className="container">
            <div className="modal">
                <Card 
                title={'Забыли пароль?'} 
                subtitle={'Не волнуйтесь, такое случается. Пожалуйста, введите email, привязанный к вашему аккаунту.'}
                fields={<Input type={'email'}
                              htmlFor={'email'}
                              placeholder={'user@example.com'}
                              title={'Email'}
                              value={email}
                              onChangeInput={(e) => setEmail(e.target.value)}
                        />
                }
                modify={modify}
                textBtn={textBtn}
                handleClick={handleRequestResetTokenPassword}
                />
            </div>
        </div>
    );
};

export default ForgotPassword;