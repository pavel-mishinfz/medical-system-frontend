import React from 'react';
import FormHeader from './FormHeader';
import InputList from './InputList';
import Button from '../Button/Button';
import SmallText from './SmallText';


export default function Form({isLogin, title, inputListData, textBtn, onHandleBtn, onCloseModal, smallText}) {

  return (
    <div className="form">
        {onCloseModal && <div className="form__close" onClick={onCloseModal}>&times;</div>}
        <FormHeader title={title} />
        <InputList inputListData={inputListData} />
        {isLogin && (<SmallText modify={'form__small--login'} nav={{addr: '/forgot-password', addrText: 'Забыли пароль?'}}/>)}
        <Button text={textBtn} onHandleClick={onHandleBtn}/>
        <SmallText text={smallText.text} nav={smallText.nav}/>
    </div>
  );
}
