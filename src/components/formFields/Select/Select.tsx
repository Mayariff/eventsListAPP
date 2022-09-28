import React, {ChangeEventHandler} from 'react';
import {fieldType, selectDataType} from "../type";


const Select = ({values, onChangeHandler, labelName, labelFor, value}: fieldType<selectDataType>) => {


    const selectHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
        onChangeHandler(e.currentTarget.value as selectDataType)
    }

    return (
        <>
            <label htmlFor={labelFor}> {labelName}: </label>
            <select name={labelFor} id={labelFor} onChange={selectHandler} value={value}>
                {values && values.map(v => <option key={v.value} value={v.value}>{v.title}</option>)}
            </select>
        </>
    );
};

export default Select;