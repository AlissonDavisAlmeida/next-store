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
        case '[Cart]-AddToCart':

            const cart = state.cart
            const product = action.payload

            const productInCart = cart.find(item => item._id === product._id && item.sizes === product.sizes)
            let newCart = []
            if (productInCart) {

                newCart = cart.map(item => {
                    if (item._id === product._id) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item
                })

            } else {

                newCart = [...cart, { ...product }]
            }

            return {
                ...state,
                cart: newCart
            }


        default:
            return state
    }
}