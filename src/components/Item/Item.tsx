import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {itemType} from "../../API/types";
import {reverseDate} from "../../utils/reverse_date";
import {DataContex} from "../../data/context_data";

type propsType = {
    event: itemType
}

const Item = React.memo(({event}: propsType) => {

    const typeEvent = useContext(DataContex).selectEventType.filter(s => s.value === event.type)[0].title

    return (
        <tr key={event.id}>
            <td style={{border: '1px solid black'}}>{event.startDate && reverseDate(event.startDate)}</td>
            <td style={{border: '1px solid black'}}>{event.endDate ? reverseDate(event.endDate) : '-'}</td>
            <td style={{border: '1px solid black'}}><Link to={`${event.id}`}>{event.eventName}</Link></td>
            <td style={{border: '1px solid black'}}>{typeEvent}</td>
        </tr>
    );
});

export default Item;