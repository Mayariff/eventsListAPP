import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/redux-utils";
import {selectEventsList} from "./selectors";
import {eventsListActions} from "./index";
import SettingTable from "../SettingTable/SettingTable";
import Item from "../../components/Item/Item";
import TableHeader from "../../components/TableHeader/TableHeader";
import {CreateEventModal} from "../../components/Modal";
import {paramType} from "./eventlist-reducer";


const EventList = () => {
    const events = useAppSelector(selectEventsList)
    const dispatch = useAppDispatch()
    const onClickHandler = (value: paramType) => {
        dispatch(eventsListActions.filterEvents(value))
    }
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
            <table>
                <TableHeader/>
                <tbody>
                {events.map((ev) => <Item event={ev} key={ev.id}/>)}
                </tbody>
                <caption>Таблица мероприятий</caption>
            </table>
            <button onClick={clickBtnCreateEventHandler}>Создать</button>
            <CreateEventModal isOpen={createEventModal} changeIsOpen={setCreateEventModal} payload={undefined}/>
        </>
    );
};

export default EventList;