import {AppDispatchType, AppRootStateType} from "./types";
import {TypedUseSelectorHook} from "react-redux/es/types";
import {useDispatch, useSelector} from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

