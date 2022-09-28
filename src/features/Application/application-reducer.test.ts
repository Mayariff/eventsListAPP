import {InitialStateType, slice} from './application-reducer'
import {commonActions} from "../common_actions/app-actions";
import {appActions} from "./index";


const {reducer: appReducer} = slice
const {setAppError, setAppStatus} = commonActions
const {initializeApp} = appActions

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})


test('App should be initialized', () => {

    const action = initializeApp.fulfilled(undefined, 'requestId', undefined)
    const endState = appReducer(startState, action)
    expect(endState.isInitialized).toBe(true)
})



