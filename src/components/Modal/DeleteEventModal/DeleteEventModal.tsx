import React from 'react';
import {useAppDispatch} from "../../../utils/redux-utils";
import {eventsListActions} from "../../../features/EventList";
import {useNavigate} from "react-router-dom";
import {modalContentType, modalType} from "../types";
import {Modal} from "../Modal";


const DeleteEvent = React.memo(({showAdd, payload}: modalContentType<{ id: number }>) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const closeModal = () => {
        showAdd(false)
    }
    const deleteEvent = () => {
        dispatch(eventsListActions.removeEvent({id: payload.id}))
        navigate("/")
    }
    return (
        <div>
            Удалить событие?
            <button onClick={deleteEvent}> Да </button>
            <button onClick={closeModal}> Нет</button>
        </div>
    );
});

const DeleteEventModal = ({isOpen, changeIsOpen, payload}: modalType<number>) => <Modal isOpen={isOpen}
                                                                                        changeModal={changeIsOpen}>
    <DeleteEvent showAdd={changeIsOpen} payload={{id: payload}}/>
</Modal>

export default DeleteEventModal;

