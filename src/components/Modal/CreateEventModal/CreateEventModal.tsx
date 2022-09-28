import React, {MouseEventHandler, useState} from 'react';
import {itemType} from "../../../API/types";
import {useAppDispatch} from "../../../utils/redux-utils";
import {eventActions} from "../../../features/Event";
import EventFields from "../../EventFormFields/EventFields";
import {eventsListActions} from "../../../features/EventList";
import {Modal} from "../Modal";
import {modalContentType, modalType} from "../types";


const CreateEvent = ({showAdd}: modalContentType<undefined>) => {

    const dispatch = useAppDispatch()
    const [eventValue, setEventValue] = useState<Omit<itemType, "id">>({} as itemType)

    const createEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        dispatch(eventActions.createEvent({model: eventValue}))
        showAdd(false)
        dispatch(eventsListActions.fetchEvents())
    }

    const [fieldError, setFieldError]=useState<string|null>(null)

    const disableBtnCondition = !!fieldError || (!eventValue?.eventName?.length || !eventValue?.startDate?.length)

    return (
        <form>
            <EventFields event={eventValue} changeValue={setEventValue} error={fieldError} errorHandler={setFieldError}/>
            <button type={'submit'} onClick={createEvent} disabled={disableBtnCondition}>создать</button>
        </form>
    );
};


const CreateEventModal = ({isOpen, changeIsOpen}: modalType<undefined>) => <Modal isOpen={isOpen}
                                                                                  changeModal={changeIsOpen}>
    <CreateEvent showAdd={changeIsOpen} payload={undefined}/>
</Modal>

export default CreateEventModal;



