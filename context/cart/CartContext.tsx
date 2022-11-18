import { createContext } from "react";
import { SHOP_CONSTANTS } from "../../database/constants";
import { ValidSizes } from "../../database/seed-data";

export interface Cart {
    _id?: string;
    images: string;
    price: number;
    sizes?: ValidSizes;
    slug: string;
    title: string;
    gender: typeof SHOP_CONSTANTS.validGenders[keyof typeof SHOP_CONSTANTS.validGenders];
    quantity: number;
}

export interface ShippingAddress {
    name: string;
    nickname: string;
    address: string
    address2?: string
    codePostal: string
    city: string
    country: string
    phone: string
}

interface CartContextProps {
    cart: Cart[]
    addProduct: (product: Cart) => void
    updateCartQuantity: (product: Cart) => void
    removeCartProduct: (product: Cart) => void
    updateAddress: (address: ShippingAddress) => void
    quantity: number
    total: number
    isLoaded: boolean

    shippingAddress?: ShippingAddress
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps)