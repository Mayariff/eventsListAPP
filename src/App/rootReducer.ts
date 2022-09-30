import {combineReducers} from "redux";
import {eventsListReducer} from "../features/EventList";
import {eventReducer} from "../features/Event";
import {appReducer} from "../features/Application";
import {startersReducer} from "../components/StarterItem";
import {eventFormReducer} from "../components/EventFormFields/eventForm-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    eventsList: eventsListReducer,
    event: eventReducer,
    starters: startersReducer,
    eventForm: eventFormReducer
})