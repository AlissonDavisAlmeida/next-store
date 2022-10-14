import { CartProviderState } from "."
import { Cart } from "./CartContext"


type CartActionType =
    | { type: '[Cart]-LoadCart', payload: Cart[] }
    | { type: '[Cart]-AddToCart', payload: Cart }

export const cartReducer = (state: CartProviderState, action: CartActionType) => {

    switch (action.type) {
        case '[Cart]-LoadCart':
            return {
                ...state,
                cart: action.payload
            }

        default:
            return state
    }
}