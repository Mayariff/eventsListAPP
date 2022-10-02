import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../utils/redux-utils';
import {eventActions} from './index';
import {selectEvent} from './selectors';
import {DeleteEventModal, ErrorModal} from '../../components/Modal';
import {Starter} from '../../components/Starter/Starter';
import {reverseDate} from '../../utils/reverse_date';
import {DataContex} from '../../data/context_data';
import UpdateEventModal from '../../components/Modal/UpdateEventModal/UpdateEventModal';
import s from './Event.module.scss'
import Button from '../../components/Button/Button';
import {appSelectors} from '../Application';
import ErrorPage from '../../components/ErrorPage/ErrorPage';


const Event = React.memo(() => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const event = useAppSelector(selectEvent)
    const navigate = useNavigate()
    const type = useContext(DataContex)
    const status = useContext(DataContex).selectEventStatus
    //общие ошибки
    const error = useAppSelector(appSelectors.selectError)
    const [errorModal, setErrorModal] = useState(!!error);


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

    const filteredType = type.selectEventType.filter(s => s.value === event.type)[0]
    const filteredStatus = status.filter(s => s.value === event.status)[0]
    const typeEvent = filteredType ? filteredType?.title : 'all'
    const statusEvent = filteredStatus ? filteredStatus.title : event.status

    return (<>
            {error && <ErrorModal isOpen={errorModal} changeIsOpen={setErrorModal} payload={{error}}/>}
            <UpdateEventModal isOpen={updateEventModal} changeIsOpen={setUpdateEventModal} payload={event}/>
            <DeleteEventModal isOpen={delEventModal} changeIsOpen={setDelEventModal} payload={event.id}/>
            <div className={s.container}>
                <button className={s.buttonBack} onClick={onClickHandler}/>
                <div className={s.eventContainer}>
                    <h2 className={s.firstHeader}>{event.eventName}</h2>
                    <div className={s.contentBlock}>
                        <div className={s.item}>
                            <div className={s.categoryHeader}>Тип мероприятия:</div>
                            <div className={s.categoryValue}>{typeEvent}</div>
                        </div>
                        <div className={s.item}>
                            <div className={s.categoryHeader}>Статус:</div>
                            <div className={s.categoryValue}>{statusEvent}</div>
                        </div>
                        <div className={s.item}>
                            <div className={s.categoryHeader}>Период проведения:</div>
                            <div className={s.categoryValue}>
                                {!!event.startDate && reverseDate(event.startDate)} {!!event.endDate &&
                                <span> - {event.endDate && reverseDate(event.endDate)}</span>}
                            </div>
                        </div>
                        {event.description &&
                            <div className={s.item}>
                                <div className={s.categoryHeader}>Описание:</div>
                                <div className={s.categoryValue}>{event.description}</div>
                            </div>
                        }
                        {event.startersList &&
                            <div className={s.item}>
                                <div className={s.categoryHeader}>Список участников:</div>
                                <div className={s.categoryValue}>
                                    <ol>
                                        {event.startersList.map(s => <Starter key={s.id} data={s}/>)}
                                    </ol>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div>
                </div>
                <div className={s.buttonContainer}>
                    <Button onClick={onClickBtnChangeHandler} btnName={'Изменить'}/>
                    <Button onClick={onClickBtnDelHandler} btnName={'Удалить'} color={'second'}/>
                </div>
            </div>
        </>
    );

});

export default Event;

