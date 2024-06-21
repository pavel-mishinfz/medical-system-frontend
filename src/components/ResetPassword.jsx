import React, {useState} from 'react';
import axios from 'axios';
import Card from './Card/Card';
import Input from './Form/Input';
import { useLocation, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const token = searchParams.get('token');

    const navigate = useNavigate();
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);

    const handleResetPassword = async () => {
        const requestBody = {
          token: token,
          password: password
        };

        console.log(requestBody);

        axios.post('http://' + window.location.hostname + ':5000/auth/reset-password', requestBody)
        .then(response => {
            console.log('Reset passwrod successful:', response.status);
            navigate('/login');
        })
        .catch(error => {
            console.error('Reset passwrod  failed:', error);
        });
    }

    return (
        <div className="container">
            <div className="modal">
                <Card 
                title={'Сброс пароля'} 
                subtitle={'Пожалуйста, введите что-нибудь, что вы запомните'}
                fields={
                    <>
                        <Input
                            type={'password'}
                            htmlFor={'password'}
                            title={'Новый пароль'}
                            placeholder={'Новый пароль'}
                            onChangeInput={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type={'password'}
                            htmlFor={'password_confirm'}
                            title={'Подтвердите пароль'}
                            placeholder={'Подтвердите пароль'}
                            onChangeInput={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </>
                }
                textBtn={'Сбросить пароль'}
                handleClick={handleResetPassword}
                />
            </div>
        </div>
    );
};

export default ResetPassword;