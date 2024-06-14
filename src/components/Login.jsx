import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from './Form/Form';


const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        
        const requestBody = new URLSearchParams();
        requestBody.append('username', username);
        requestBody.append('password', password);

        try {
            const response = await axios.post('http://'+ window.location.hostname + ':8006/auth/jwt/login', requestBody, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            });
    
            console.log('Login successful:', response.status);
    
            const token = response.data.access_token;
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
    
            sessionStorage.setItem('authToken', response.data.access_token);
            sessionStorage.setItem('userId', decodedToken.sub);
            sessionStorage.setItem('groupId', decodedToken.group_id);
    
            // navigate('/');
            window.location.replace('/');
          } catch (error) {
            const errorData = error.response.data;
            const errorDetails = {};
            if (errorData.detail === "LOGIN_BAD_CREDENTIALS") {
              errorDetails['email'] = 'Неверный логин или пароль';
              errorDetails['password'] = 'Неверный логин или пароль';
            } else if (errorData.detail === "LOGIN_USER_NOT_VERIFIED") {
              errorDetails['email'] = 'Почта не подтверждена';
            }
            setErrors(errorDetails);
          }

    };

    return (
        <div className="container">
            <div className="modal">
                <Form
                    errors={errors}
                    title={"Авторизация"}
                    textBtn={'Войти в систему'}
                    isLogin={true}
                    onHandleBtn={handleLogin}
                    inputListData={[
                        {
                            type: 'email',
                            htmlFor: 'email',
                            placeholder: 'user@example.com',
                            title: 'Email',
                            value: username,
                            onChangeInput: (e) => setUsername(e.target.value)
                        },
                        {
                            type: 'password',
                            htmlFor: 'password',
                            placeholder: 'Пароль',
                            title: 'Пароль',
                            value: password,
                            onChangeInput: (e) => setPassword(e.target.value)
                        },
                    ]}
                    smallText={{text: 'Не имеете аккаунт?', nav: {addr: '/register', addrText: 'Регистрация'}}}
                />
            </div>
        </div>
    );
};

export default Login;