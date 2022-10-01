import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/redux-utils";
import {selectEventsList} from "./selectors";
import {eventsListActions} from "./index";
import SettingTable from "../SettingTable/SettingTable";
import TableRow from "../../components/TableRow/TableRow";
import TableHeader from "../../components/TableHeader/TableHeader";
import {CreateEventModal} from "../../components/Modal";
import {paramType} from "./eventlist-reducer";
import s from './EventList.module.scss'


const EventList = React.memo(() => {
    const events = useAppSelector(selectEventsList)
    const dispatch = useAppDispatch()
    const onClickHandler = useCallback((value: paramType) => {
        dispatch(eventsListActions.filterEvents(value))
    }, [eventsListActions.filterEvents, dispatch])
    // btn 'create event'
    const clickBtnCreateEventHandler = () => {
        setCreateEventModal(true)
    }
    //API модального окна
    const [createEventModal, setCreateEventModal] = useState(false);

    useEffect(() => {
        dispatch(eventsListActions.fetchEvents())
    }, [])

    return (<>
            <SettingTable onClickHandler={onClickHandler}/>
            <div className={s.tableWrap}>
                <table className={s.table}>
                    <TableHeader/>
                    <tbody>
                    {events.map((ev) => <TableRow event={ev} key={ev.id}/>)}
                    </tbody>
                </table>
            </div>
            <button onClick={clickBtnCreateEventHandler}>Создать</button>
            <CreateEventModal isOpen={createEventModal} changeIsOpen={setCreateEventModal} payload={undefined}/>
        </>
    );
});

export default EventList;