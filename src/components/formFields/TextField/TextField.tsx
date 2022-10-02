import React, {ChangeEventHandler, FocusEventHandler, KeyboardEventHandler} from 'react';
import {textFieldType} from '../type';
import s from './TextField.module.scss'


const TextField = React.memo(({
                                  onChangeHandler,
                                  labelName,
                                  labelFor,
                                  value,
                                  maxLength,
                                  type,
                                  errorHandler,
                                  ...props
                              }: textFieldType) => {
    const changeInputValue: ChangeEventHandler<HTMLInputElement> = (e) => {
        const currValue = e.currentTarget.value
        if (maxLength && currValue.length > maxLength) {
            errorHandler && errorHandler(`превышина максимальная длина строки ${maxLength} знаков`)
        } else {
            errorHandler && errorHandler(null)
            onChangeHandler(currValue)
        }
    }
    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        props.onBlur && props.onBlur(e)
        if (props.required && (!value || value.trim().length === 0)) {
            errorHandler && errorHandler('заполните обязательные поля')
        }
    }
    const onFocusHandler = () => {
        errorHandler && errorHandler(null)
    }

    const onKeyPressCallback:KeyboardEventHandler<HTMLInputElement> = (e) => {
        props.onKeyPress && props.onKeyPress(e);
        props.onEnter && e.key === 'Enter' && props.onEnter()
    }

    return (<div className={s.textField}>
            <label className={s.label} htmlFor={labelFor}>{labelName}
                {props.required && <span className={s.required}>*</span>} :</label>
            <input className={s.input}
                   id={labelFor}
                   type={type ? type : 'text'}
                   value={value.toString()}
                   onChange={changeInputValue} {...props}
                   onBlur={onBlurHandler}
                   onFocus={onFocusHandler}
                   onKeyPress={onKeyPressCallback}
            />
            <div className={s.count}>{maxLength ? `${value.length} / ${maxLength}`: ' '} </div>
        </div>
    );
});

export default TextField;