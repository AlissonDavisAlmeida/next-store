import { FC, PropsWithChildren, useReducer } from "react";
import { uiReducer } from "./ui-reducer";
import { UIContext } from "./UIContext";

export interface UIState {
    isOpenMenu: boolean;
}


const UI_INITIAL_STATE: UIState = {
    isOpenMenu: false,
}


export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);


    const toogleSideMenu = () => {
        dispatch({ type: 'TOOGLE_MENU' });
    }


    return (

        <UIContext.Provider value={{ ...state, toogleSideMenu }}>
            {children}
        </UIContext.Provider>
    )
}