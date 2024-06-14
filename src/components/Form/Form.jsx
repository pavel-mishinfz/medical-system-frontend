import React from 'react';
import FormHeader from './FormHeader';
import InputList from './InputList';
import Button from '../Button/Button';
import SmallText from './SmallText';


export default function Form({isLogin, errors, title, inputListData, modify, textBtn, onHandleBtn, onCloseModal, smallText}) {

  return (
    <div className="form">
        {onCloseModal && <div className="form__close" onClick={onCloseModal}>&times;</div>}
        <FormHeader title={title} />
        <InputList inputListData={inputListData} errors={errors}/>
        {isLogin && (<SmallText modify={'form__small--login'} nav={{addr: '/forgot-password', addrText: 'Забыли пароль?'}}/>)}
        <Button modify={modify} text={textBtn} onHandleClick={onHandleBtn}/>
        {smallText && (<SmallText text={smallText.text} nav={smallText.nav}/>)}
    </div>
  );
}
