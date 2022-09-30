import React, {ChangeEventHandler, FocusEventHandler} from 'react';
import {textFieldType} from "../type";


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

    return (<>
            <label htmlFor={labelFor}>{props.required ? `${labelName}*` : labelName} :</label>
            <input id={labelFor}
                   type={type ? type : 'text'}
                   value={value.toString()} onChange={changeInputValue} {...props}
                   onBlur={onBlurHandler} onFocus={onFocusHandler}

            />
            {maxLength && <div>{value.length}/ {maxLength} </div>}
        </>
    );
});

export default TextField;