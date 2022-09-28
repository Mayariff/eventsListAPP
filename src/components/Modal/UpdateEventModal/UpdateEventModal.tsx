import {itemType} from "../../../API/types";
import {useAppDispatch} from "../../../utils/redux-utils";
import React, {MouseEventHandler, useState} from "react";
import EventFields, {eventFieldType} from "../../EventFormFields/EventFields";
import {eventActions} from "../../../features/Event";
import {modalContentType, modalType} from "../types";
import {Modal} from "../Modal";

const _UpdateEvent = ({showAdd, payload}: modalContentType<{event:itemType}>) => {

    const dispatch = useAppDispatch()
    const [eventValue, setEventValue] = useState<eventFieldType>(payload.event)
    const updateEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        dispatch(eventActions.updateEvent({event: eventValue as itemType}))
        showAdd(false)
    }
    const [fieldError, setFieldError]=useState<string|null>(null)

    const disableBtnCondition = !!fieldError ||!eventValue?.eventName?.length || !eventValue?.startDate?.length

    return (
        <form>
            <EventFields event={eventValue} changeValue={setEventValue} error={fieldError} errorHandler={setFieldError}/>
            <button type={'submit'} onClick={updateEvent} disabled={disableBtnCondition}>Изменить</button>
        </form>
    );
};

const UpdateEventModal = ({isOpen, changeIsOpen, payload}: modalType<itemType>) => <Modal isOpen={isOpen}
                                                                                          changeModal={changeIsOpen}>
    <_UpdateEvent showAdd={changeIsOpen} payload={{event:payload}}/>
</Modal>

export default UpdateEventModal;
