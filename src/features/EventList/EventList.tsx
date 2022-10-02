import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/redux-utils";
import {selectEventsList} from "./selectors";
import {eventsListActions} from "./index";
import SettingTable from "../SettingTable/SettingTable";
import TableRow from "../../components/TableRow/TableRow";
import TableHeader from "../../components/TableHeader/TableHeader";
import {CreateEventModal, ErrorModal} from "../../components/Modal";
import {paramType} from "./eventlist-reducer";
import s from './EventList.module.scss'
import Button from "../../components/Button/Button";
import {appSelectors} from "../Application";


const EventList = React.memo(() => {
    const events = useAppSelector(selectEventsList)
    const dispatch = useAppDispatch()
    //общие ошибки
    const error = useAppSelector(appSelectors.selectError)
    const [errorModal, setErrorModal] = useState(!!error);

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
            {error && <ErrorModal isOpen={errorModal} changeIsOpen={setErrorModal} payload={{error}}/>}
            <CreateEventModal isOpen={createEventModal} changeIsOpen={setCreateEventModal} payload={undefined}/>
            <SettingTable onClickHandler={onClickHandler}/>
            <div className={s.tableWrap}>
                <table className={s.table}>
                    <TableHeader/>
                    <tbody>
                    {events.map((ev) => <TableRow event={ev} key={ev.id}/>)}
                    </tbody>
                </table>
            </div>
            <Button btnName={'Создать'} onClick={clickBtnCreateEventHandler} disabled={createEventModal}/>
        </>
    );
});

export default EventList;