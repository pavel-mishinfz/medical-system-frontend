import React from 'react';
import RecordPanel from '../RecordPanel/RecordPanel';
import User from './User';
import { useNavigate } from 'react-router-dom';


export default function UsersList({users, openRegisterModal}) {
  const navigate = useNavigate();

  return (
    <div className="spec__doctors">
        {users.map(user => 
        <div key={user.id} className="spec__doctors-item">
          <User userData={user}/>
          {user.specialization_id !== null ? (
            <RecordPanel doctorId={user.id} openRegisterModal={openRegisterModal}/>
          ) : (
            <div className="panel-user">
              <div className="panel-user__item" onClick={() => navigate(`/medical-card/${user.id}`)}>
                <img src="/img/sidebar/nav/card.svg" alt="medcard" />
                <p>Медкарта</p>
              </div>
              <div className="panel-user__item" onClick={() => navigate(`/health-diary/${user.id}`)}>
                <img src="/img/sidebar/nav/diary.svg" alt="diary" />
                <p>Дневник здоровья</p>
              </div>
            </div>
          )}
        </div>
        )}
    </div>
  );
}
