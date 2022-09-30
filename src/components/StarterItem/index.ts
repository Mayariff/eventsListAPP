import {startersType} from "../../API/types";
import {slice} from "./starters-reducer";
import {AppRootStateType} from "../../utils/types";
import {StarterItem} from "./StarterItem";


const startersReducer = slice.reducer
const actions = slice.actions

const startersActions = {
    ...actions,
}
const selectStarters= (state: AppRootStateType) => state.starters

export type StartersListType = {
    deleteStarter: (id: number) => void
    changeStarter: (value: startersType) => void
    isDepartment: boolean
    starter:startersType
}

export {
    selectStarters,
    startersReducer,
    startersActions,
    StarterItem
}