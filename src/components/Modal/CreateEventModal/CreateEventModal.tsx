import React, {MouseEventHandler, useCallback, useState} from 'react';
import {itemType} from "../../../API/types";
import {useAppDispatch, useAppSelector} from "../../../utils/redux-utils";
import {eventActions} from "../../../features/Event";
import {eventsListActions} from "../../../features/EventList";
import {Modal} from "../Modal";
import {modalContentType, modalType} from "../types";
import {selectStarters} from "../../StarterItem";
import {EventFields, eventFieldType, selectEventFormFields} from "../../EventFormFields";


const CreateEvent = React.memo(({showAdd}: modalContentType<undefined>) => {

    const dispatch = useAppDispatch()
    const starters = useAppSelector(selectStarters)
    const event = useAppSelector(selectEventFormFields)
    const [eventValue, setEventValue] = useState<Omit<itemType, "id">>({} as itemType)

    const [fieldError, setFieldError] = useState<string | null>(null)

    const onChangeHandler = useCallback((value: eventFieldType) => {
        setEventValue(value)
        setFieldError(null)
    }, [])


    const createEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        if (event?.endDate && event.startDate > event?.endDate) {
            setFieldError('Дата начала события должна  быть раньше его конца')
        } else if (event.eventName?.length === 0) {
            setFieldError('заполните обязательные поля')
        } else {
            dispatch(eventActions.createEvent({model: {...eventValue, ...event, startersList: starters}}))
            showAdd(false)
            dispatch(eventsListActions.fetchEvents())
        }
    }


    return (
        <form>
            <EventFields event={eventValue} changeValue={onChangeHandler} error={fieldError}
                         errorHandler={setFieldError} isCreateModal={true}/>
            <button type={'submit'} onClick={createEvent} disabled={!!fieldError}>создать</button>
            {fieldError && <span>{fieldError}</span>}
        </form>
    );
});


const CreateEventModal = ({isOpen, changeIsOpen}: modalType<undefined>) => <Modal isOpen={isOpen}
                                                                                  changeModal={changeIsOpen}>
    <CreateEvent showAdd={changeIsOpen} payload={undefined}/>
</Modal>

export default CreateEventModal;



