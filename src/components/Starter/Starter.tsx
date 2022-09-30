import {startersType} from "../../API/types";
import React from "react";

type propsType = { data: startersType };

export const Starter = React.memo(({data}: propsType) => {
    const {name, position, department} = data
    const starter = name && position ? `${name} (${position})`: name
    return (
        <li>
            {department ? department : starter}
        </li>
    )
})