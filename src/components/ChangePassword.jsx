import React, {useState} from 'react';
import axios from 'axios';
import Card from './Card/Card';
import { useLocation, useNavigate } from 'react-router-dom';


const ChangePassword = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const encodeEmail = makeEncodeEmail(state ? state.email : 'default@example.com');
    const [textBtn, setTextBtn] = useState('Отправить');
    const [modify, setModify] = useState('');
    


    const handleRequestResetTokenPassword = async () => {
      const requestBody = {
        email: state.email
      };
      try {
        const response = await axios.post('http://'+ window.location.hostname + ':8006/auth/forgot-password', requestBody, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
        console.log(response.status);
        setTextBtn('Сообщение успешно отправлено!');
        setModify('btn--success');
        setTimeout(function() {
            setTextBtn('Отправить');
            setModify('');
        }, 3000);

        if (state.id === 'me') {
          sessionStorage.clear();
          navigate('/');
        } else {
          navigate('/users');
        }
       
      } catch(error) {
          console.error('Request Reset Token Password Error:', error);
      }
    }

    return (
      <div className="container">
        {state && (
          <div className="modal">
            <Card
              title={'Изменить пароль?'}
              subtitle={`Пришлём ссылку для сброса пароля на почту ${encodeEmail}`}
              textBtn={textBtn}
              modify={modify}
              handleClick={handleRequestResetTokenPassword}
            />
          </div>
        )}
      </div>
    );
};

export default ChangePassword;


function makeEncodeEmail(email) {
  const idxAt = email.indexOf('@');
  const tmp = email.substr(2, idxAt-2);
  return email.replace(tmp, "****");
}