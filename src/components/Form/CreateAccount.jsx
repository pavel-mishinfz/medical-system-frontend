import React, {useEffect, useState} from 'react';
import axios from 'axios';
import generatePassword from '../../generatePassword';
import FormHeader from './FormHeader';
import Select from './Select';
import Input from './Input';
import Button from '../Button/Button';


const PasswordLength = 15;

const CreateAccount = ({isDoctor}) => {
    const initPassword = generatePassword(PasswordLength);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(initPassword);
    const [passwordConfirm, setPasswordConfirm] = useState(initPassword);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthday, setBirthday] = useState('');
    const [specializationId, setSpecializationId] = useState(null);
    const [description, setDescription] = useState('');
    const [dateEmployment, setDateEmployment] = useState('');
    const [specializationsList, setSpecializationsList] = useState('');

    const [textBtn, setTextBtn] = useState('Создать аккаунт');
    const [modify, setModify] = useState('');

    useEffect(() => {
      axios.get('http://' + window.location.hostname + ':8000/specializations')
        .then(response => {
          setSpecializationsList(response.data);
        })
        .catch(error => {
          console.error('Get Specializations failed:', error);
        });
    }, [])


    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            console.log('Пароли должны совпадать!');
        }
        let requestBody = {};
        const data = {
          email,
          password,
          is_active: true,
          is_superuser: false,
          is_verified: false,
          name,
          surname,
          patronymic,
          birthday,
        };

        if (isDoctor) {
          requestBody = {
            ...data, 
            group_id: 2, 
            specialization_id: specializationId, 
            desc: description, 
            date_employment: dateEmployment
          }
        } else {
          requestBody = {...data, group_id: 3}
        }
    
        axios.post('http://' + window.location.hostname + ':8000/auth/register', requestBody)
          .then(response => {
            console.log('Registration successful:', response.status);
            
            const email = response.data.email;
    
            const requestBody = {
              email: email,
              password: password
            };
        
            axios.post('http://' + window.location.hostname + ':8000/auth/request-verify-token', requestBody)
              .then(response => {
                console.log('Request verify successful:', response.status);
                setTextBtn('Пользователь успешно создан!');
                setModify('btn--success');
                flushFormData();

                setTimeout(function() {
                    setTextBtn('Создать аккаунт');
                    setModify('');
                }, 3000);
              })
              .catch(error => {
                console.error('Request verify failed:', error);
              });
  
          })
          .catch(error => {
            console.error('Registration failed:', error);
          });
    };

    const flushFormData = () => {
      setName('');
      setSurname('');
      setPatronymic('');
      setBirthday('');
      setEmail('');
      setSpecializationId(null);
      setDescription('');
      setDateEmployment('');
      setPassword(generatePassword(PasswordLength));
    }


    return (
      <div className="form" style={{maxHeight: 'unset'}}>
        <FormHeader title={isDoctor ? 'Регистрация врача' : 'Регистрация пациента'} />
        <Input 
          type={'text'}
          htmlFor={'name'}
          placeholder={'Имя'}
          title={'Имя'}
          value={name}
          onChangeInput={(e) => setName(e.target.value)}
        />
        <Input 
          type={'text'}
          htmlFor={'surname'}
          placeholder={'Фамилия'}
          title={'Фамилия'}
          value={surname}
          onChangeInput={(e) => setSurname(e.target.value)}
        />
        <Input 
          type={'text'}
          htmlFor={'patronymic'}
          placeholder={'Отчество'}
          title={'Отчество'}
          value={patronymic}
          onChangeInput={(e) => setPatronymic(e.target.value)}
        />
        <Input 
          type={'date'}
          htmlFor={'birthday'}
          placeholder={'Дата рождения'}
          title={'Дата рождения'}
          value={birthday}
          onChangeInput={(e) => setBirthday(e.target.value)}
        />
        {isDoctor && specializationsList && (
          <>
            <Select
              options={specializationsList}
              value={specializationId}
              onChangeSelect={(specId) => setSpecializationId(specId)}
            />
            <Input
              type={'text'}
              htmlFor={'desc'}
              placeholder={'Описание'}
              title={'Описание'}
              value={description}
              onChangeInput={(e) => setDescription(e.target.value)}
            />
            <Input
              type={'date'}
              htmlFor={'dateEmployment'}
              placeholder={'Дата принятия на работу'}
              title={'Дата принятия на работу'}
              value={dateEmployment}
              onChangeInput={(e) => setDateEmployment(e.target.value)}
            />
          </>
        )}
        <Input 
          type={'email'}
          htmlFor={'email'}
          placeholder={'Email'}
          title={'Email'}
          value={email}
          onChangeInput={(e) => setEmail(e.target.value)}
        />
        <Input 
          type={'password'}
          htmlFor={'password'}
          placeholder={'Пароль'}
          title={'Пароль'}
          value={password}
          onChangeInput={(e) => setPassword(e.target.value)}
        />
        <Input 
          type={'password'}
          htmlFor={'password_confirm'}
          placeholder={'Подтвердите пароль'}
          title={'Подтвердите пароль'}
          value={passwordConfirm}
          onChangeInput={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button modify={modify} text={textBtn} onHandleClick={handleRegister} />
      </div>
    );
}

export default CreateAccount;