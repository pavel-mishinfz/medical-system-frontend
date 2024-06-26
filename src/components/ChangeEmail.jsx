import React, {useState, createContext} from 'react';
import axios from 'axios';
import Card from './Card/Card';
import { useLocation } from 'react-router-dom';


export const ChangeEmailContext = createContext();

const ChangeEmail= () => {
    const [hasConfirmCode, setHasConfirmCode] = useState(false);
    const { state } = useLocation();
    const encodeEmail = makeEncodeEmail(state ? state.email : 'default@example.com');



    const handleRequestConfirmCode = async () => {
      try {
        const response = await axios.post('http://'+ window.location.hostname + ':5000/send_confirm_code', '', {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                        },
                    });
        setHasConfirmCode(true);
      } catch(error) {
          console.error('Get Request Confirm Code Error:', error);
      }
    }

    return (
      <div className="container">
        {state && (
          <div className="modal">
            <ChangeEmailContext.Provider
              value={{
                hasConfirmCode: hasConfirmCode,
                userId: state.id
              }}
            >

              <Card
                title={'Изменить почту?'}
                subtitle={`Пришлём код подтверждения на почту ${encodeEmail}`}
                textBtn={'Отправить'}
                handleClick={handleRequestConfirmCode}
              />

            </ChangeEmailContext.Provider>
          </div>
        )}
      </div>
    );
};

export default ChangeEmail;


function makeEncodeEmail(email) {
  const idxAt = email.indexOf('@');
  const tmp = email.substr(2, idxAt-2);
  return email.replace(tmp, "****");
}