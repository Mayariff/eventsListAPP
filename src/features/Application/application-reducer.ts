import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {eventsListActions} from "../EventList";
import {handleAError} from "../../utils/error-utils";
import {commonActions} from "../common_actions/app-actions";

const initializeApp = createAsyncThunk('application/initializeApp', (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(eventsListActions.fetchEvents())

    } catch (err) {
        return handleAError({message:`failed initialization attempt`}, thunkAPI)
    }

})

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isInitialized = true
            })
            .addCase(commonActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(commonActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})


export const appAction = {initializeApp}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка -запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (загрузилась начальная дата)
    isInitialized: boolean
}
