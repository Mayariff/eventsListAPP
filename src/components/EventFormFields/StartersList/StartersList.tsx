import React, {useState} from "react";
import TextField from "../../formFields/TextField/TextField";
import {startersType} from "../../../API/types";

type StartersListType = {
    deleteField: (id: number) => void
    changeField: (value: startersType) => void
    value: startersType
    isDepartment: boolean
}

export const StartersList = ({deleteField, changeField, value, isDepartment}: StartersListType) => {
    const [name, setName] = useState<string>(value.person?.name ? value.person?.name : '')
    const [position, setPosition] = useState<string>(value.person?.position ? value.person?.position : '')
    const [department, setDepartment] = useState<string>(value.department ? value.department : '')

    const onChangeName = (value: string) => setName(value)
    const onPosition = (value: string) => setPosition(value)
    const onChangeDepartment = (value: string) => setDepartment(value)

    const closeField = () => deleteField(value.id)


    const onMouseLeaveHandler = () => {
        if (isDepartment) {
            changeField({...value, department})
        } else {
            changeField({...value, person: {...value.person, position, name}})
        }
    }


    return (
        <div onMouseLeave={onMouseLeaveHandler}>
            {isDepartment ?
                <TextField onChangeHandler={onChangeDepartment} labelName={'Отдел'} labelFor={'department'}
                           value={department}/> : <>
                    <TextField onChangeHandler={onChangeName} labelName={'Имя'} labelFor={'name_starter'} value={name}/>
                    <TextField onChangeHandler={onPosition} labelName={'Должность'} labelFor={'position_starter'}
                               value={position}/>
                </>}
            <input type={'button'} value={'-'} onClick={closeField}/>
        </div>
    )
}