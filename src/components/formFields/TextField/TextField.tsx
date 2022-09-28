import React, {ChangeEventHandler} from 'react';
import {textFieldType} from "../type";


const TextField = ({
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
    const onBlurHandler = () => {
        if (props.required && !value) {
            errorHandler && errorHandler('поле обязательно')
        }
    }
    const onFocusHandler = () => {
        errorHandler && errorHandler(null)
    }

    return (<>
            <label htmlFor={labelFor}>{labelName} :</label>
            <input id={labelFor}
                   type={type ? type : 'text'}
                   value={value} onChange={changeInputValue} {...props}
                   onBlur={onBlurHandler} onFocus={onFocusHandler}

            />
            {maxLength && <div>{value.length}/ {maxLength} </div>}
        </>
    );
};

export default TextField;