import * as eventListsSelectors from './selectors'
import {eventListActions, slice} from "./eventlist-reducer";
import EventList from "./EventList";


const eventsListReducer = slice.reducer
const actions = slice.actions

const eventsListActions = {
    ...actions,
    ...eventListActions
}


export {
    eventListsSelectors,
    eventsListReducer,
    eventsListActions,
    EventList
}
