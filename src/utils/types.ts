// redux common types
import {rootReducer} from "../App/rootReducer";
import {store} from "../App/store";

export type RootReducerType = typeof rootReducer

export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: string } }