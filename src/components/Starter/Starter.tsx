import {startersType} from '../../API/types';
import React from 'react';
import s from './Starter.module.scss'

type propsType = { data: startersType };

export const Starter = React.memo(({data}: propsType) => {
    const {name, position, department} = data
    const starter = name && position ? `${name} (${position})` : name
    return (
        <li className={s.starter}>
            {department ? department : starter}
        </li>
    )
})