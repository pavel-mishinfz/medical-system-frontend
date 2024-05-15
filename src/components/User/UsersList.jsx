import React from 'react';
import RecordPanel from '../RecordPanel/RecordPanel';
import User from './User';


export default function UsersList({users, openRegisterModal}) {
  return (
    <div className="spec__doctors">
        {users.map(user => 
        <div key={user.id} className="spec__doctors-item">
          <User userData={user}/>
          {user.specialization_id !== null && (
            <RecordPanel doctorId={user.id} openRegisterModal={openRegisterModal}/>
          )}
        </div>
        )}
    </div>
  );
}
