import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card/Card';


const Confirm = () => {
    const navigate = useNavigate();
    const [isNotVerified, setIsNotVerified] = useState(false);
    const [textBtn, setTextBtn] = useState('Отправить');
    const [modify, setModify] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const requestBody = {
        token: token
    };

    useEffect(() => {
        axios.post('http://' + window.location.hostname + ':5000/auth/verify', requestBody)
        .then(response => {
            console.log('Verify successful:', response.status);
            navigate('/');
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.detail === 'VERIFY_USER_BAD_TOKEN') {
                console.error('Verify failed:', error);
                setIsNotVerified(true);
            } else if (error.response && error.response.data && error.response.data.detail === 'VERIFY_USER_ALREADY_VERIFIED') {
                navigate('/');
            } else {
                console.error('Verify failed:', error);
                setIsNotVerified(true);
            }
        });
    }, [])

    const handleRequestVerify = async () => {
        
        const requestBody = {
        email: email
        };

        axios.post('http://' + window.location.hostname + ':5000/auth/request-verify-token', requestBody)
        .then(response => {
            setTextBtn('Сообщение успешно отправлено!');
            setModify('btn--success');
            setTimeout(function() {
                setTextBtn('Отправить');
                setModify('');
            }, 3000);
            console.log('Verify successful:', response.status);
        })
        .catch(error => {
            console.error('Verify failed:', error);
        });
    };


    return ( 
    <>
        {isNotVerified && (
            <div className="container">
                <div className="modal">
                    <Card
                        title={'Что-то пошло не так...'}
                        subtitle={'Ваш токен оказался некорректным, попробуйте отправить новый.'}
                        modify={modify}
                        textBtn={textBtn}
                        handleClick={handleRequestVerify}
                    />
                </div>
            </div>
        )};
    </>);
};

export default Confirm;