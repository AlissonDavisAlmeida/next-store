import { UIState } from "./UIProvider"

type UiActionType =
    | { type: "TOOGLE_MENU" }

export const uiReducer = (state: UIState, action: UiActionType) => {


    switch (action.type) {
        case "TOOGLE_MENU":
            return {
                ...state,
                isOpenMenu: !state.isOpenMenu
            }


        default:
            return state;
    }
}