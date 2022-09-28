import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {eventType, itemType} from "../../API/types";
import {ThunkError} from "../../utils/types";
import {ArrangementList} from "../../API/ArrangementList";
import {handleAError} from "../../utils/error-utils";
import {commonActions} from "../common_actions/app-actions";



const fetchEvents = createAsyncThunk<{ events: Array<itemType> }, undefined, ThunkError>('events-list/fetchEvents', (params, thunkAPI) => {
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = ArrangementList.getAll()
        thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        return {events: res}
    } catch (error) {
        return handleAError({message: `Events doesn't fetch`}, thunkAPI)
    }
})

const filterEvents = createAsyncThunk<{ events: Array<itemType> , params: paramType}, paramType, ThunkError>('events-list/filterEvents', (params, thunkAPI) => {
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = ArrangementList.getAll()
        thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        return {events:res, params}
    } catch (error) {
        return handleAError({message: `Events doesn't fetch`}, thunkAPI)
    }

})

const removeEvent = createAsyncThunk<{ id: number }, { id: number }, ThunkError>('events-list/removeEvent', (params, thunkAPI) => {
    const {id} = params
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = ArrangementList.remove(id)
        if (res) {
            thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
            return {id}
        }
    } catch (error) {
        return handleAError({message: `Event didn't  removed`}, thunkAPI)
    }

})

export const slice = createSlice({
    name: 'events-list',
    initialState: [] as Array<itemType>,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.fulfilled, (state, action) => {
                return action.payload.events.sort((a,b)=> a.startDate>b.startDate? 1: -1)
            })
            .addCase(filterEvents.fulfilled, (state, action) => {
            const {type, dateFrom, dateTo}=action.payload.params
               return  action.payload.events.filter(ev => type === 'all' ? ev : ev.type === type)
                .filter(ev => !dateFrom ? ev : ev.startDate >= dateFrom)
                .filter(ev => !dateTo ? ev : ev.endDate && ev.endDate <= dateTo)
            })
            .addCase(removeEvent.fulfilled, (state, action) => {
                const index = state.findIndex(t => t.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
    }
})

export type paramType = { type: eventType | 'all', dateTo: string, dateFrom: string }
export const eventListActions = {fetchEvents, filterEvents, removeEvent}

