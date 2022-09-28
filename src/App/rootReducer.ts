import {combineReducers} from "redux";
import {eventsListReducer} from "../features/EventList";
import {eventReducer} from "../features/Event";
import {appReducer} from "../features/Application";


export const rootReducer = combineReducers({
    app: appReducer,
    eventsList: eventsListReducer,
    event: eventReducer
})