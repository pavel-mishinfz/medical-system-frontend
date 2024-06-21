import React, {useState} from 'react';
import axios from 'axios';
import Card from './Card/Card';
import Input from './Form/Input';
import { useLocation, useNavigate } from 'react-router-dom';


const ResetEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { state } = useLocation();
    
    const handleResetEmail = async () => {

      axios.patch('http://' + window.location.hostname + `:5000/users/${state.userId}/email?email=${email}`, '', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      })
        .then(response => {
          
          const requestBody = {
            email: response.data.email
          };

          axios.post('http://' + window.location.hostname + ':5000/auth/request-verify-token', requestBody)
            .then(response => {
              console.log('Request verify successful:', response.status);
              if (state.userId === 'me') {
                window.location.replace('/');
              } else {
                navigate('/users');
              }
            })
            .catch(error => {
              console.error('Request verify failed:', error);
            });

        })
        .catch(error => {
          console.error('Reset Email Error:', error);
        })
    }  

    return (
      <div className="container">
        {state && (
          <div className="modal">
            <Card
              title={'Смена почты'}
              subtitle={'Укажите новый адрес электронной почты'}
              fields={
                <Input
                  type={'email'}
                  htmlFor={'email'}
                  title={'Email'}
                  placeholder={'user@example.com'}
                  value={email}
                  onChangeInput={(e) => setEmail(e.target.value)}
                />
              }
              textBtn={'Изменить'}
              handleClick={handleResetEmail}
            />
          </div>
        )}
      </div>
    );
};

export default ResetEmail;
