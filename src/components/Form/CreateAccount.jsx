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
    const [errors, setErrors] = useState({});
    const errorDetails = {};

    const [textBtn, setTextBtn] = useState('Создать аккаунт');
    const [modify, setModify] = useState('');

    useEffect(() => {
      axios.get('http://' + window.location.hostname + ':8006/specializations')
        .then(response => {
          setSpecializationsList(response.data);
          setSpecializationId(response.data[0].id);
        })
        .catch(error => {
          console.error('Get Specializations failed:', error);
        });
    }, [])

    useEffect(() => {
      setErrors({});
    }, [isDoctor])

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
          errorDetails['password_confirm'] = 'Пароли должны совпадать';
          setErrors(errorDetails);
          return;
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
    
        axios.post('http://' + window.location.hostname + ':8006/auth/register', requestBody)
          .then(response => {
            console.log('Registration successful:', response.status);
            
            const email = response.data.email;
    
            const requestBody = {
              email: email,
              password: password
            };
        
            axios.post('http://' + window.location.hostname + ':8006/auth/request-verify-token', requestBody)
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
            console.log(error)
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

    const flushFormData = () => {
      setName('');
      setSurname('');
      setPatronymic('');
      setBirthday('');
      setEmail('');
      setSpecializationId(null);
      setDescription('');
      setDateEmployment('');

      const initPassword = generatePassword(PasswordLength);
      setPassword(initPassword);
      setPasswordConfirm(initPassword);
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
          error={errors['name']}
        />
        <Input 
          type={'text'}
          htmlFor={'surname'}
          placeholder={'Фамилия'}
          title={'Фамилия'}
          value={surname}
          onChangeInput={(e) => setSurname(e.target.value)}
          error={errors['surname']}
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
          error={errors['birthday']}
        />
        {isDoctor && specializationsList && (
          <>
            <Select
              options={specializationsList}
              value={specializationId}
              onChangeSelect={(specId) => setSpecializationId(specId)}
              error={errors['specialization_id']}
            />
            <Input
              type={'text'}
              htmlFor={'desc'}
              placeholder={'Описание'}
              title={'Описание'}
              value={description}
              onChangeInput={(e) => setDescription(e.target.value)}
              error={errors['desc']}
            />
            <Input
              type={'date'}
              htmlFor={'dateEmployment'}
              placeholder={'Дата начала работы'}
              title={'Дата начала работы'}
              value={dateEmployment}
              onChangeInput={(e) => setDateEmployment(e.target.value)}
              error={errors['date_employment']}
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
          error={errors['email']}
        />
        <Input 
          type={'password'}
          htmlFor={'password'}
          placeholder={'Пароль'}
          title={'Пароль'}
          value={password}
          onChangeInput={(e) => setPassword(e.target.value)}
          error={errors['password']}
        />
        <Input 
          type={'password'}
          htmlFor={'password_confirm'}
          placeholder={'Подтвердите пароль'}
          title={'Подтвердите пароль'}
          value={passwordConfirm}
          onChangeInput={(e) => setPasswordConfirm(e.target.value)}
          error={errors['password_confirm']}
        />
        <Button modify={modify} text={textBtn} onHandleClick={handleRegister} />
      </div>
    );
}

export default CreateAccount;