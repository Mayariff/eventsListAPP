import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {eventFieldType} from "./index";



export const slice = createSlice({
    name: 'eventForm',
    initialState: {} as eventFieldType,
    reducers: {
        updateEventForm(state, action: PayloadAction<eventFieldType>) {
            return action.payload
        },

    }
})

export const eventFormReducer = slice.reducer
export const {updateEventForm} = slice.actions