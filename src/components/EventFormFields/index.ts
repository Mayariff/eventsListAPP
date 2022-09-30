import {slice} from "./eventForm-reducer";
import {itemType} from "../../API/types";
import {AppRootStateType} from "../../utils/types";
import EventFields from "./EventFields";


const eventFormReducer = slice.reducer
const actions = slice.actions

const eventFormReducerActions = {
    ...actions,
}
export type eventFieldType = itemType | Omit<itemType, "id">

export type EventFieldsType = {
    event: eventFieldType,
    changeValue: (value: eventFieldType) => void
    error?: string | null
    errorHandler?: (error: string | null) => void
    isCreateModal?:boolean
}
const selectEventFormFields= (state: AppRootStateType) => state.eventForm


export {
    eventFormReducer,
    eventFormReducerActions,
    selectEventFormFields,
    EventFields
}
