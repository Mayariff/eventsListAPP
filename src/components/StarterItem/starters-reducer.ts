import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {startersType} from "../../API/types";


export const slice = createSlice({
    name: 'starters',
    initialState: [] as Array<startersType>,
    reducers: {
        updateStarters(state, action: PayloadAction<{ starters: Array<startersType> }>) {
            return action.payload.starters.filter(s => s.department || s.name)
        },

    }
})

const startersReducer = slice.reducer
const {updateStarters} = slice.actions
