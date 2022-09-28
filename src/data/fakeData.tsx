import {itemType} from "../API/types";

export const data: Array<itemType> = [
    {
        id: 23,
        type: 'meeting',
        startDate: '2022-03-01',
        endDate: '2022-03-01',
        eventName: 'Ретро',
        description: 'Ежегодный митинг, посвященный ретроспективе с выступлением сотрудников (лимит на выступление 5 минут)',
        status: 'happened',
        startersList: [
            {id: 15, department: 'отдел по продажам'},
            {id: 166, department: 'маркетологи'},
            {id: 16, department: 'it отдел'},
            {id: 11335, department: 'финансисты'},]
    },
    {
        id: 27,
        type: 'team_building',
        startDate: '2022-05-12',
        endDate: '2022-05-13',
        eventName: 'Команда: любить и не убить',
        description: 'Тренинг с приглашенным коучем о том, как установить продуктивные взаимоотношения в команде',
        status: 'cancelled',
        startersList: [{id: 1, person:{name: 'Максим', position: 'teamLead'}},
            {id: 11, person:{name: 'Егор', position: 'backEnd'}},
            {id: 19, person:{name: 'Игорь', position: 'backEnd'}},
            {id: 21, person:{name: 'Юля', position: 'тестировщик'}},
            {id: 30, person:{name: 'Максим', position: 'верстальщик'}},
            {id: 28, person:{name: 'Кристина', position: 'frontEnd'}},
            {id: 71, person:{name: 'Олег', position: 'frontEnd'}},
        ]
    },
    {
        id: 333,
        type: 'meeting',
        startDate: '2022-11-17',
        endDate: '2022-11-18',
        eventName: 'Апокалипсис сегодня',
        description: 'Встречи с заказчиком для проработки тз для нового направления',
        status: 'planned',
        startersList: [{id: 1, person:{name: 'Максим', position: 'teamLead'}},
            {id: 2, person:{name: 'Евгений', position: 'секретарь'}},
            {id: 5, person:{name: 'Анаставия', position: 'дизайнер'}},
            {id: 4, person:{name: 'Вадим', position: 'аналитик'}}
        ]
    },
    {
        id: 888,
        type: 'corporate_party',
        startDate: '2022-12-31',
        endDate: '2023-01-01',
        eventName: 'Happy New Year',
        description: 'Традиционная корпоративная вечеринка на Мальдивах',
        status: 'planned',
        startersList: [ {id: 1000, department: 'Все сотрудники'}]
    },
]