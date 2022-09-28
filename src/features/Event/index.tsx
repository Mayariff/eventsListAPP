import {eventThunkActions, slice} from "./event-reducer";
import * as eventSelectors from './selectors'


const eventReducer = slice.reducer
const actions = slice.actions

const eventActions = {
    ...actions,
    ...eventThunkActions
}


export {
    eventSelectors,
    eventReducer ,
    eventActions,
}
