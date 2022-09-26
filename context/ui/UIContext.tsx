import { createContext } from "react";

type UIContextType = {
    isOpenMenu: boolean;
    toogleSideMenu: () => void;
}

export const UIContext = createContext<UIContextType>({} as UIContextType);