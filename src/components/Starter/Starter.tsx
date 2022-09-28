import {startersType} from "../../API/types";
import React from "react";

type propsType = { data: startersType };
export const Starter = ({data}: propsType) => {
    const {person, department} = data
    const starter = person && `${person.name} (${person.position})`
    return (
        <li>
            {department ? department : starter}
        </li>
    )
}