import {paramType, slice} from "./eventlist-reducer";
import {itemType} from "../../API/types";
import {eventsListActions} from "./index";


const {reducer: eventsListReducer} = slice
const {fetchEvents, filterEvents, removeEvent} = eventsListActions
let startState: Array<itemType>


beforeEach(() => {
    startState = [
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
    ]
})

test('events should be added to event list', () => {
    const payload = {events: startState}
    const action = fetchEvents.fulfilled(payload, 'requestId', undefined)
    const endState = eventsListReducer([], action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(startState[0].id)
})

test('event list should be filtered', () => {
    const params = {type: 'corporate_party', dateTo: '', dateFrom: ''} as paramType
    const payload = {events: startState, params}
    const action = filterEvents.fulfilled(payload, 'requestId', params)
    const endState = eventsListReducer(startState, action)
    expect(endState.length).toBe(0)
})

test('event should be removed', () => {
    const payload = {id: 23}
    const action = removeEvent.fulfilled(payload, 'requestId', payload)
    const endState = eventsListReducer(startState, action)
    expect(endState.length).toBe(0)
})






