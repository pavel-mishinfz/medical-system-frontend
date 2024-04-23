import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from './Form/Form';


const Register = ({modify, isOpenModal, closeModal}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            console.log('Пароли должны совпадать!');
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
    
        axios.post('http://' + window.location.hostname + ':8000/auth/register', requestBody)
          .then(response => {
            console.log('Registration successful:', response.status);
            
            const email = response.data.email;
    
            const requestBody = {
              email: email
            };
        
            axios.post('http://' + window.location.hostname + ':8000/auth/request-verify-token', requestBody)
              .then(response => {
                console.log('Request verify successful:', response.status);
              })
              .catch(error => {
                console.error('Request verify failed:', error);
              });
    
            navigate('/');
    
          })
          .catch(error => {
            console.error('Registration failed:', error);
          });
    };


    return (
        <div className={modify} style={isOpenModal ? {} : {display: 'none'}}>
            <Form 
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
            />
        </div>
    );
}

export default Register;