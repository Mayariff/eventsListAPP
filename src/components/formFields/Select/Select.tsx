import React, {ChangeEventHandler} from 'react';
import {fieldType, selectDataType} from '../type';
import s from './Select.module.scss'


const Select = React.memo(({values, onChangeHandler, labelName, labelFor, value}: fieldType<selectDataType>) => {


    const selectHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
        onChangeHandler(e.currentTarget.value as selectDataType)
    }

    return (
        <div className={s.container}>
            <label className={s.label} htmlFor={labelFor}> {labelName}: </label>
            <select className={s.select} name={labelFor} id={labelFor} onChange={selectHandler} value={value}>
                {values && values.map(v => <option key={v.value} value={v.value}>{v.title}</option>)}
            </select>
        </div>
    );
});

export default Select;