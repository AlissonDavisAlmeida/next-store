import { FC, useReducer } from "react"
import { cartReducer } from "./cart-reducer"
import { Cart, CartContext } from "./CartContext"

interface CartProviderProps {
    children: React.ReactNode
}

export interface CartProviderState {
    cart: Cart[]
}

const initial_state: CartProviderState = {
    cart: []
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initial_state)

    const addProduct = (product: Cart) => {
        dispatch({
            type: "[Cart]-AddToCart",
            payload: product
        })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}