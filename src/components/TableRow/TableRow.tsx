import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {itemType} from "../../API/types";
import {reverseDate} from "../../utils/reverse_date";
import {DataContex} from "../../data/context_data";
import s from './TableRow.module.scss'

type propsType = {
    event: itemType
}

const TableRow = React.memo(({event}: propsType) => {

    const typeEvent = useContext(DataContex).selectEventType.filter(s => s.value === event.type)[0].title

    return (
        <tr key={event.id} className={s.tableRow}>
            <td>{event.startDate && reverseDate(event.startDate)}</td>
            <td>{event.endDate ? reverseDate(event.endDate) : '-'}</td>
            <td><Link to={`${event.id}`} className={s.linkText}>{event.eventName}</Link></td>
            <td>{typeEvent}</td>
        </tr>
    );
});

export default TableRow;