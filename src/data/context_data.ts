import React from "react";

export type  valueSelectType = {
    value: string,
    title: string
}

export const selectData = {
    selectEventType: [{
        value: 'all',
        title: 'все'
    },
        {
            value: 'team_building',
            title: 'тимбилдинг'
        },
        {
            value: 'conference_call',
            title: 'конф.кол'
        },
        {
            value: 'corporate_party',
            title: 'корпоратив'
        },
        {
            value: 'meeting',
            title: 'встреча'
        },
        {
            value: 'other',
            title: 'другое'
        },
    ]
    ,
    selectEventStatus: [
        {
            value: 'planned',
            title: 'запланировано'
        },
        {
            value: 'in_progress',
            title: 'началось'
        },
        {
            value: 'happened',
            title: 'закончилось'
        },
        {
            value: 'cancelled',
            title: 'отменено'
        },
    ]
}


export const DataContex = React.createContext(selectData)