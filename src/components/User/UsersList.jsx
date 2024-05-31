import React from 'react';
import RecordPanel from '../RecordPanel/RecordPanel';
import User from './User';


export default function UsersList({users, openRegisterModal, medicalCards, isAdminUsersList}) {

  return (
    <div className="spec__doctors">
        {users.map(user => 
        <div key={user.id} className="spec__doctors-item">
          <User userData={user}/>
          {user.specialization ? (
            isAdminUsersList ? (
              <>
              <div className="panel-user__item" onClick={() => window.location.replace(`/schedule/${user.id}`)}>
                <img src="/img/sidebar/nav/calendar.svg" alt="medcard" />
                <p>График работы</p>
              </div>
              </>
            ) : (
              <RecordPanel doctor={user} openRegisterModal={openRegisterModal}/>
            )
          ) : (
            <div className="panel-user">
              <div className="panel-user__item" onClick={() => window.location.replace(`/medical-card/${getParamMedcardUrl(medicalCards, user)}`)}>
                <img src="/img/sidebar/nav/card.svg" alt="medcard" />
                <p>Медкарта</p>
              </div>
              <div className="panel-user__item" onClick={() => window.location.replace(`/health-diary/${user.id}`)}>
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

function getParamMedcardUrl(cards, user) {
  if (cards) {
    const target = cards.find(card => card.id_user === user.id);
    if(target) {
      return target.id;
    } else {
      return user.id;
    }
  }
}