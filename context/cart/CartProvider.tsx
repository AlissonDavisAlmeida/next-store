import { FC, useEffect, useMemo, useReducer } from "react"
import { cartReducer } from "./cart-reducer"
import { Cart, CartContext } from "./CartContext"

import Cookies from "js-cookie"

interface CartProviderProps {
    children: React.ReactNode
}

export interface CartProviderState {
    cart: Cart[]
    isLoaded: boolean
}

const initial_state: CartProviderState = {
    cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [],
    isLoaded: Cookies.get("cart") ? true : false
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initial_state)

    useEffect(() => {

        Cookies.set("cart", JSON.stringify(state.cart))

    }, [state.cart])


    const addProduct = (product: Cart) => {
        dispatch({
            type: "[Cart]-AddToCart",
            payload: product
        })

    }

    const updateCartQuantity = (product: Cart) => {
        dispatch({
            type: "[Cart]-UpdateCartQuantity",
            payload: product
        })

    }

    const removeCartProduct = (product: Cart) => {
        dispatch({
            type: "[Cart]-RemoveFromCart",
            payload: product
        })

    }

    const quantity = useMemo(() => state.cart.reduce((acc, product) => acc + product.quantity, 0), [state.cart])
    const total = useMemo(() => state.cart.reduce((acc, product) => acc + product.price * product.quantity, 0), [state.cart])

    return (
        <CartContext.Provider value={{
            ...state,
            addProduct,
            updateCartQuantity,
            removeCartProduct,
            quantity,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}