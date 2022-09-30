import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../utils/redux-utils";
import {eventActions} from "./index";
import {selectEvent} from "./selectors";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import {DeleteEventModal} from "../../components/Modal";
import {Starter} from "../../components/Starter/Starter";
import {reverseDate} from "../../utils/reverse_date";
import {DataContex} from "../../data/context_data";
import UpdateEventModal from "../../components/Modal/UpdateEventModal/UpdateEventModal";


const Event = React.memo(() => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const event = useAppSelector(selectEvent)
    const navigate = useNavigate()

    const type = useContext(DataContex).selectEventType.filter(s => s.value === event.type)[0]
    const status = useContext(DataContex).selectEventStatus.filter(s => s.value === event.status)[0]

    const typeEvent = type ? type?.title : event.type
    const statusEvent = status ? status.title : event.status

    //API модального окна
    const [updateEventModal, setUpdateEventModal] = useState(false);
    const [delEventModal, setDelEventModal] = useState(false);

    //btn 'change event'
    const onClickBtnChangeHandler = () => {
        setUpdateEventModal(true)
        id && dispatch(eventActions.fetchEvent({id}))
    }
    //btn 'delete event'
    const onClickBtnDelHandler = () => {
        setDelEventModal(true)
    }
    //back btn
    const onClickHandler = () => navigate(-1)

    useEffect(() => {
        id && dispatch(eventActions.fetchEvent({id}))
    }, [updateEventModal])


    if (!Number(id)) return <ErrorPage/>

    return (
        <div>
            <div>
                <button onClick={onClickBtnChangeHandler}>изменить</button>
                <button onClick={onClickBtnDelHandler}>удалить</button>
            </div>
            <h2>{event.eventName} </h2>
            <h3>{typeEvent}</h3>
            <div>
                <div>Статус: {statusEvent} </div>
                Период проведения: {!!event.startDate && reverseDate(event.startDate)} {!!event.endDate &&
                <span> - {event.endDate && reverseDate(event.endDate)} </span>}
                {event.description &&
                    <div>Описание : {event.description} </div>}
                {event.startersList &&
                    <div>Список участников:
                        <ol>
                            {event.startersList.map(s => <Starter key={s.id} data={s}/>)}
                        </ol>
                    </div>
                }
            </div>
            <button onClick={onClickHandler}>back</button>
            <UpdateEventModal isOpen={updateEventModal} changeIsOpen={setUpdateEventModal} payload={event}/>
            <DeleteEventModal isOpen={delEventModal} changeIsOpen={setDelEventModal} payload={event.id}/>
        </div>
    );
});

export default Event;

