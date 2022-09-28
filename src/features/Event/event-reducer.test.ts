import {slice} from "./event-reducer";
import {eventActions} from "./index";
import {itemType} from "../../API/types";


const {reducer: eventReducer} = slice
const {fetchEvent, createEvent, updateEvent} = eventActions

let startState: itemType

beforeEach(() => {
    startState = {
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
    }
})

test('event should be set', () => {
    const action = fetchEvent.fulfilled({event: startState}, 'requestId', {id: '23'})
    const endState = eventReducer({} as itemType, action)
    expect(endState).toEqual(startState)
    expect(endState.id).toBe(23)
})

test('event should be created', () => {
    const model = {
        type: 'meeting',
        startDate: '2022-03-01',
        endDate: '2022-03-01',
        eventName: 'Ретро',
        description: 'Ежегодный митинг',
        status: 'happened',
        startersList: []
    } as Omit<itemType, "id">
    const action = createEvent.fulfilled({event: startState}, 'requestId', {model})
    const endState = eventReducer({} as itemType, action)
    expect(endState).toEqual(startState)
    expect(endState.id).toBe(23)
})

test('event should be update', () => {
    const model = {
        ...startState,
        type: 'corporate_party',
    } as itemType
    const action = updateEvent.fulfilled({event: model}, 'requestId', {event: model})
    const endState = eventReducer(startState, action)
    expect(endState.type).toBe('corporate_party')
    expect(endState.status).toBe('happened')

})