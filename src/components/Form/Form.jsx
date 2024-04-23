import React from 'react';
import FormHeader from './FormHeader';
import InputList from './InputList';
import Button from '../Button/Button';
import SmallTextRegister from './SmallTextRegister';


export default function Form({title, inputListData, textBtn, onHandleBtn, onCloseModal}) {

  return (
    <div class="form">
        {onCloseModal && <div className="form__close" onClick={onCloseModal}>&times;</div>}
        <FormHeader title={title} />
        <InputList inputListData={inputListData} />
        <Button text={textBtn} onHandleClick={onHandleBtn}/>
        <SmallTextRegister />
    </div>
  );
}
