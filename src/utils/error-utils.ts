import {commonActions} from "../features/common_actions/app-actions";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleAError = (error: {message: string}, thunkAPI: ThunkAPIType) => {
    thunkAPI.dispatch(commonActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: error.message})
}