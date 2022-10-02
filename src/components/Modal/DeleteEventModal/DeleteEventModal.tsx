import React from 'react';
import {useAppDispatch} from '../../../utils/redux-utils';
import {eventsListActions} from '../../../features/EventList';
import {useNavigate} from 'react-router-dom';
import {modalContentType, modalType} from '../types';
import {Modal} from '../Modal';
import s from './DeleteEventModal.module.scss'
import Button from "../../Button/Button";


const DeleteEvent = React.memo(({showAdd, payload,}: modalContentType<{ id: number }>) => {
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
        <div className={s.container}>
            <h3 className={s.title}>Удалить событие?</h3>
            <div className={s.btnMenu}>
                <Button onClick={deleteEvent} btnName={'Да'} />
                <Button onClick={closeModal} btnName={'Нет'} color={'second'}/>
            </div>
        </div>
    );
});

const DeleteEventModal = ({isOpen, changeIsOpen, payload}: modalType<number>) => <Modal isOpen={isOpen}
                                                                                        changeModal={changeIsOpen}>
    <DeleteEvent showAdd={changeIsOpen} payload={{id: payload}} />
</Modal>

export default DeleteEventModal;

