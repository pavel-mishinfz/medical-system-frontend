import React from 'react';
import { Link } from 'react-router-dom';


export default function SmallTextRegister() {
  return (
    <div class="form__small">
        <small class="form__small-text">
            Уже имеете аккаунт?
            <Link to="#">Войти</Link>
        </small>
    </div>
  );
}
