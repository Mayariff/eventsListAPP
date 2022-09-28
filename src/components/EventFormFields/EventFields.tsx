import React, {ChangeEventHandler, FocusEventHandler, useContext, useState} from 'react';
import Select from "../formFields/Select/Select";
import {selectDataType} from "../formFields/type";
import TextField from "../formFields/TextField/TextField";
import {StartersList} from "./StartersList/StartersList";
import {DataContex} from "../../data/context_data";
import {eventType, itemType, startersType, statusEventType} from "../../API/types";
import {create_id} from "../../utils/create_id";

export type eventFieldType = itemType | Omit<itemType, "id">

type propsType = {
    event: eventFieldType,
    changeValue: (value: eventFieldType) => void
    error?: string | null
    errorHandler?: (error: string | null) => void
}


const EventFields = ({event, changeValue, error, errorHandler}: propsType) => {
    //Select values
    const selectTypeData = useContext(DataContex).selectEventType.filter(s => s.value !== 'all')
    const selectStatusData = useContext(DataContex).selectEventStatus

    //starters logic
    const [starters, setStarters] = useState<Array<startersType>>(event?.startersList ? event.startersList : [])
    const isPersonCondition = starters.length > 0 && starters[0]?.hasOwnProperty('person')
    const [isPerson, setIsPerson] = useState<boolean>(isPersonCondition)
    const addField = () => {
        const obj = {id: create_id()}
        setStarters(starters => [...starters, obj])
    }
    const deleteField = (id: number) => {
        setStarters(starters => starters.filter(s => s.id !== id))
    }
    const changeField = (value: startersType) => {
        setStarters(starters.map(s => s.id === value.id ? value : s))
    }
    const changeDepartment: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsPerson(e.currentTarget.checked)
        setStarters([])
    }

    //fields value
    const [startDate, setStartDate] = useState<string>(event?.startDate ? event.startDate : '')
    const [endDate, setEndDate] = useState<string>(event?.endDate ? event.endDate : '')
    const [type, setType] = useState<eventType>(event?.type ? event.type : 'other')
    const [eventName, setEventName] = useState<string>(event?.eventName ? event.eventName : '')
    const [description, setDescription] = useState<string>(event?.description ? event.description : '')
    const [status, setStatus] = useState<statusEventType>(event?.status ? event.status : 'planned')

    //fields handlers
    const onChangeInputValueFrom = (value: string) => setStartDate(value)
    const onChangeInputValueTo = (value: string) => setEndDate(value)
    const selectHandler = (value: string) => setType(value as eventType)
    const onChangeNameHandler = (value: string) => setEventName(value)
    const onChangeDescriptionHandler = (value: string) => setDescription(value)
    const selectStatusHandler = (value: string) => setStatus(value as statusEventType)

    const onChangeHandler: FocusEventHandler<HTMLDivElement> = (e) => {
        const newEvent: Omit<itemType, "id"> = {
            type, startDate, endDate, status,
            eventName: eventName.trim(),
            description: description.trim(),
            startersList: starters
        }
        changeValue({...event, ...newEvent})
    }


    return (
        <div onChange={onChangeHandler}>
            <Select values={selectTypeData}
                    onChangeHandler={selectHandler}
                    labelName={'Тип события'}
                    labelFor={'event_type'}
                    value={type as selectDataType}/>
            <TextField labelName={'Дата начала'}
                       labelFor={'from_date'}
                       value={startDate}
                       onChangeHandler={onChangeInputValueFrom} type={'date'}
                       required={true}
                       errorHandler={errorHandler}/>

            <TextField labelName={'Дата окончания'}
                       labelFor={'to_date'}
                       value={endDate}
                       onChangeHandler={onChangeInputValueTo} type={'date'}/>
            <TextField onChangeHandler={onChangeNameHandler}
                       labelName={'Название'}
                       labelFor={'name'}
                       value={eventName}
                       required={true}
                       errorHandler={errorHandler}
                       maxLength={45}
            />
            <TextField onChangeHandler={onChangeDescriptionHandler}
                       labelName={'Описание'}
                       labelFor={'description'}
                       value={description}
                       errorHandler={errorHandler}
                       maxLength={100}
            />
            <Select values={selectStatusData}
                    onChangeHandler={selectStatusHandler}
                    labelName={'Статус события'}
                    labelFor={'event_status'}
                    value={status}/>
            <label>Список участников: <input type={'button'} value={'+'} onClick={addField}/></label>
            <label><input type={'checkbox'} checked={isPerson} onChange={changeDepartment}/> Сотрудники </label>

            {starters.map(s => <StartersList key={s.id}
                                             deleteField={deleteField}
                                             changeField={changeField}
                                             value={s}
                                             isDepartment={!isPerson}
            />)}
        </div>
    );
};

export default EventFields;