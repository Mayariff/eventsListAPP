import {createAction} from '@reduxjs/toolkit'
import {RequestStatusType} from "../Application/application-reducer";



const setAppStatus = createAction<{status: RequestStatusType}>('appActions/setAppStatus')
const setAppError = createAction<{error: string | null}>('appActions/setAppError')

export const commonActions = {
    setAppStatus,
    setAppError
}
