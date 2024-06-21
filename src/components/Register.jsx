import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from './Form/Form';


const Register = ({isOpenModal, closeModal}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errors, setErrors] = useState({});
    const errorDetails = {};

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
          errorDetails['password_confirm'] = 'Пароли должны совпадать';
          setErrors(errorDetails);
          return;
        }

        const requestBody = {
          email,
          password,
          is_active: true,
          is_superuser: false,
          is_verified: false,
          name,
          surname,
          patronymic,
          group_id: 3,
          birthday,
        };
    
        axios.post('http://' + window.location.hostname + ':5000/auth/register', requestBody)
          .then(response => {
            console.log('Registration successful:', response.status);
            
            const email = response.data.email;
    
            const requestBody = {
              email: email
            };
        
            axios.post('http://' + window.location.hostname + ':5000/auth/request-verify-token', requestBody)
              .then(response => {
                console.log('Request verify successful:', response.status);
              })
              .catch(error => {
                console.error('Request verify failed:', error);
              });
    
            navigate(`/confirm-register?email=${email}`);
    
          })
          .catch(error => {
            const errorData = error.response.data;
            if (errorData.detail === "REGISTER_USER_ALREADY_EXISTS") {
              errorDetails['email'] = 'Пользователь с такой почтой уже существует';
            } else if (errorData.detail.code === "REGISTER_INVALID_PASSWORD") {
              errorDetails['password'] = errorData.detail.reason;
            } else {
              errorData.detail.forEach((error) => {
                  const field = error.loc[1];
                  errorDetails[field] = error.msg.split(',')[1];
              });
            }
            setErrors(errorDetails);
          });
    };


    return (
        <div className="modal">
            <Form 
            errors={errors}
            title={'Регистрация'}
            inputListData={[
                {
                    type: 'text',
                    htmlFor: 'name',
                    placeholder: 'Имя',
                    title: 'Имя',
                    value: name,
                    onChangeInput: (e) => setName(e.target.value)
                },
                {
                    type: 'text',
                    htmlFor: 'surname',
                    placeholder: 'Фамилия',
                    title: 'Фамилия',
                    value: surname,
                    onChangeInput: (e) => setSurname(e.target.value)
                },
                {
                    type: 'text',
                    htmlFor: 'patronymic',
                    placeholder: 'Отчество',
                    title: 'Отчество',
                    value: patronymic,
                    onChangeInput: (e) => setPatronymic(e.target.value)
                },
                {
                    type: 'date',
                    htmlFor: 'birthday',
                    placeholder: 'Дата рождения',
                    title: 'Дата рождения',
                    value: birthday,
                    onChangeInput: (e) => setBirthday(e.target.value)
                },
                {
                    type: 'email',
                    htmlFor: 'email',
                    placeholder: 'user@example.com',
                    title: 'Email',
                    value: email,
                    onChangeInput: (e) => setEmail(e.target.value)
                },
                {
                    type: 'password',
                    htmlFor: 'password',
                    placeholder: 'Пароль',
                    title: 'Пароль',
                    value: password,
                    onChangeInput: (e) => setPassword(e.target.value)
                },
                {
                    type: 'password',
                    htmlFor: 'password_confirm',
                    placeholder: 'Подтвердите пароль',
                    title: 'Подтвердите пароль',
                    value: passwordConfirm,
                    onChangeInput: (e) => setPasswordConfirm(e.target.value)
                }
            ]}
            textBtn={'Зарегистрироваться'}
            onHandleBtn={handleRegister}
            onCloseModal={closeModal ? closeModal : null}
            smallText={{text: 'Уже имеете аккаунт?', nav: {addr: '/login', addrText: 'Войти'}}}
            />
        </div>
    );
}

export default Register;