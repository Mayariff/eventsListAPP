import React, {FocusEventHandler, useCallback, useState} from 'react';
import TextField from '../formFields/TextField/TextField';
import {StartersListType} from './index';
import s from './StartersItem.module.scss'


export const StarterItem = React.memo(({
                                           deleteStarter,
                                           changeStarter,
                                           starter,
                                           isDepartment,
                                       }: StartersListType) => {

    const [name, setName] = useState<string>(starter.name ? starter.name : '')
    const [position, setPosition] = useState<string>(starter.position ? starter.position : '')
    const [department, setDepartment] = useState<string>(starter.department ? starter.department : '')


    const onChangeName = useCallback((value: string) => setName(value), [starter])
    const onPosition = useCallback((value: string) => setPosition(value), [starter])
    const onChangeDepartment = useCallback((value: string) => setDepartment(value), [starter])

    const closeField = () => deleteStarter(starter.id)

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {

        if (isDepartment) {
            changeStarter({
                ...starter,
                department: department.trim()
            })
        } else
            changeStarter({
                ...starter,
                name: name.trim(),
                position: position.trim()
            })
    }


    return (
        <div className={isDepartment ? s.container : `${s.container} ${s.person}`}>
            {isDepartment ?
                <TextField onChangeHandler={onChangeDepartment}
                           labelName={'Отдел'}
                           labelFor={'department'}
                           value={department}
                           onBlur={onBlurHandler}/> : <>
                    <TextField onChangeHandler={onChangeName}
                               labelName={'Имя'}
                               labelFor={'name_starter'}
                               value={name}
                               onBlur={onBlurHandler}
                    />
                    <TextField onChangeHandler={onPosition}
                               labelName={'Должность'}
                               labelFor={'position_starter'}
                               value={position}
                               onBlur={onBlurHandler}
                    />
                </>}
            <input className={s.button} type={'button'} value={'-'} onClick={closeField}/>
        </div>
    )
})