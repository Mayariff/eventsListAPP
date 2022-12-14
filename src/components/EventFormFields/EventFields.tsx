import React, {ChangeEventHandler, MouseEventHandler, useCallback, useContext, useState} from 'react';
import Select from '../formFields/Select/Select';
import {selectDataType} from '../formFields/type';
import TextField from '../formFields/TextField/TextField';
import {DataContex} from '../../data/context_data';
import {eventType, itemType, startersType, statusEventType} from '../../API/types';
import {create_id} from '../../utils/create_id';
import {useAppDispatch, useAppSelector} from '../../utils/redux-utils';
import {updateEventForm} from "./eventForm-reducer";
import {selectStarters, StarterItem, startersActions} from '../StarterItem';
import {EventFieldsType} from './index';
import s from './EventFormField.module.scss'
import Button from "../Button/Button";


const EventFields = React.memo(({event, changeValue, error, errorHandler, isCreateModal,title}: EventFieldsType) => {
    const dispatch = useAppDispatch()
    //Select values
    const selectTypeData = useContext(DataContex).selectEventType.filter(s => s.value !== 'all')
    const selectStatusData = useContext(DataContex).selectEventStatus
    const Starters = useAppSelector(selectStarters)

    //starters logic
    const [starters, setStarters] = useState<Array<startersType>>(event.startersList ? event.startersList : [])
    const isPersonCondition = starters.length > 0 && starters[0]?.hasOwnProperty('name')
    const [isPerson, setIsPerson] = useState<boolean>(isPersonCondition)
    const addField = () => {
        const obj = {id: create_id()}
        setStarters(starters => [...starters, obj])
    }
    const deleteField = (id: number) => {
        const newStarters = starters.filter(s => s.id !== id)
        dispatch(startersActions.updateStarters({starters: newStarters}))
        setStarters(newStarters)
    }

    const changeStartersField = useCallback((value: startersType) => {
        const newStarters = starters.map(s => s.id === value.id ? value : s)
        dispatch(startersActions.updateStarters({starters: newStarters}))
        setStarters(newStarters)
    }, [starters])


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
    const onChangeInputValueFrom = useCallback((value: string) => {
        dispatch(updateEventForm({...event, startDate: value}))
        setStartDate(value)
    }, [setStartDate, updateEventForm])
    const onChangeInputValueTo = useCallback((value: string) => {
        dispatch(updateEventForm({...event, endDate: value}))
        setEndDate(value)
    }, [setEndDate, updateEventForm])
    const selectHandler = useCallback((value: string) => {
        dispatch(updateEventForm({...event, type: value as eventType}))
        setType(value as eventType)
    }, [updateEventForm, setType])
    const onChangeNameHandler = useCallback((value: string) => {
        dispatch(updateEventForm({...event, eventName: value.trim()}))
        setEventName(value)
        errorHandler && errorHandler(null)
    }, [updateEventForm, setEventName, errorHandler])
    const onChangeDescriptionHandler = useCallback((value: string) => {
        dispatch(updateEventForm({...event, description: value.trim()}))
        setDescription(value)
    }, [setDescription, updateEventForm])
    const selectStatusHandler = useCallback((value: string) => {
        dispatch(updateEventForm({...event, status: value as statusEventType}))
        setStatus(value as statusEventType)
    }, [updateEventForm, setStatus])

    //only for create event
    const onMouseLeaveHandler: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        if (isCreateModal) {
            const newEvent: Omit<itemType, "id"> = {
                type, startDate, endDate, status,
                eventName: eventName.trim(),
                description: description.trim(),
                startersList: Starters
            }
            dispatch(updateEventForm({...newEvent}))
            changeValue(newEvent)
        }
    }, [type, startDate, endDate, status, starters, description])


    return (<>
            {title &&  <h2 className={s.title}>{title}</h2>}
        <div className={s.container} onMouseLeave={onMouseLeaveHandler}>
            <TextField onChangeHandler={onChangeNameHandler}
                       labelName={'????????????????'}
                       labelFor={'name'}
                       value={eventName}
                       required={true}
                       errorHandler={errorHandler}
                       maxLength={45}
            />
            <TextField labelName={'???????? ????????????'}
                       labelFor={'from_date'}
                       value={startDate}
                       onChangeHandler={onChangeInputValueFrom} type={'date'}
                       required={true}
                       errorHandler={errorHandler}
            />

            <TextField labelName={'???????? ??????????????????'}
                       labelFor={'to_date'}
                       value={endDate}
                       onChangeHandler={onChangeInputValueTo}
                       type={'date'}
                       errorHandler={errorHandler}
            />
            <TextField onChangeHandler={onChangeDescriptionHandler}
                       labelName={'????????????????'}
                       labelFor={'description'}
                       value={description}
                       errorHandler={errorHandler}
                       maxLength={100}
            />
            <Select values={selectTypeData}
                    onChangeHandler={selectHandler}
                    labelName={'?????? ??????????????'}
                    labelFor={'event_type'}
                    value={type as selectDataType}/>
            <Select values={selectStatusData}
                    onChangeHandler={selectStatusHandler}
                    labelName={'???????????? ??????????????'}
                    labelFor={'event_status'}
                    value={status}/>
            <div className={s.startersBlock}>
            <label className={s.label}>???????????? ????????????????????: <input className={s.button} type={'button'} value={'+'} onClick={addField}/>
            </label>
            <label className={s.checkboxContainer}>
                <span className={s.label}>????????????</span> <input type={'checkbox'} checked={isPerson} onChange={changeDepartment} className={s.checkbox}/> <span className={s.label}>????????????????????</span>
            </label>
            </div>
                {starters.map((s) => <StarterItem key={s.id}
                                                 deleteStarter={deleteField}
                                                 changeStarter={changeStartersField}
                                                 isDepartment={!isPerson}
                                                 starter={s}
            />)}

        </div>
        </>
    );
});

export default EventFields;