import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {itemType} from "../../API/types";
import {commonActions} from "../common_actions/app-actions";
import {ArrangementList} from "../../API/ArrangementList";
import {handleAError} from "../../utils/error-utils";
import {ThunkError} from "../../utils/types";

const fetchEvent = createAsyncThunk<{ event: itemType }, { id: string }, ThunkError>('Event/fetchEvent', (params, thunkAPI) => {
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const id = Number(params.id)
        const res = ArrangementList.get(id)
        thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        return {event: res}
    } catch (error) {
        return handleAError({message: `Event didn't fetch`}, thunkAPI)
    }
})
const createEvent = createAsyncThunk<{ event: itemType }, { model: Omit<itemType, "id"> }, ThunkError>('Event/createEvent', (params, thunkAPI) => {
    const {model} = params
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = ArrangementList.add(model)
        thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        return {event: res}
    } catch (error) {
        return handleAError({message: `Event didn't create`}, thunkAPI)
    }

})
const updateEvent = createAsyncThunk<{ event: itemType }, { event: itemType }, ThunkError>('Event/updateEvent', (params, thunkAPI) => {
    const {event} = params
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = ArrangementList.update(event)
        thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        return {event: res}
    } catch (error) {
        return handleAError({message: `Event didn't update`}, thunkAPI)
    }

})

export const slice = createSlice({
    name: 'event',
    initialState: {} as itemType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchEvent.fulfilled, (state, action) => {
                return action.payload.event
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                return action.payload.event
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                return action.payload.event
            })
    }
})

export const eventThunkActions = {fetchEvent, createEvent, updateEvent}
//export const  {changeType}= slice.actions

