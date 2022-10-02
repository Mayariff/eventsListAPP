import {itemType} from '../../../API/types';
import {useAppDispatch, useAppSelector} from '../../../utils/redux-utils';
import React, {MouseEventHandler, useState} from 'react';
import {eventActions} from '../../../features/Event';
import {modalContentType, modalType} from '../types';
import {Modal} from '../Modal';
import {selectStarters} from '../../StarterItem';
import {EventFields, eventFieldType, selectEventFormFields} from '../../EventFormFields';
import s from '../Modal.module.scss';
import Button from "../../Button/Button";

const _UpdateEvent = React.memo(({showAdd, payload}: modalContentType<{ event: itemType }>) => {
    const id = payload.event.id
    const starters = useAppSelector(selectStarters)
    const event = useAppSelector(selectEventFormFields)
    const dispatch = useAppDispatch()
    const [eventValue, setEventValue] = useState<eventFieldType>(payload.event)
    const [fieldError, setFieldError] = useState<string | null>(null)


    const updateEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        if (event.endDate && event.startDate > event.endDate) {
            setFieldError('Дата начала события должна  быть раньше его конца')
        } else if (event.eventName?.length === 0) {
            setFieldError('заполните обязательные поля')
        } else {
            setFieldError(null)
            dispatch(eventActions.updateEvent({
                event: {
                    ...payload.event, ...event,
                    id,
                    startersList: [...starters]
                } as itemType
            }))
            showAdd(false)
        }
    }


    const onChangeHandler = (value: eventFieldType) => {
        setEventValue({id, ...value})
    }

    return (
        <form>
            <EventFields event={eventValue} changeValue={onChangeHandler} error={fieldError}
                         errorHandler={setFieldError} title={'Изменить событие'}/>
            <Button type={'submit'} onClick={updateEvent} disabled={!!fieldError} btnName={'Изменить'}/>
            {fieldError && <div className={s.fieldError}>{fieldError}</div>}
        </form>
    );
});

const UpdateEventModal = ({isOpen, changeIsOpen, payload}: modalType<itemType>) => <Modal isOpen={isOpen}
                                                                                          changeModal={changeIsOpen}>
    <_UpdateEvent showAdd={changeIsOpen} payload={{event: payload}}/>
</Modal>

export default UpdateEventModal;
