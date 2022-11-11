import { createContext } from "react";
import { SHOP_CONSTANTS } from "../../database/constants";
import { ValidSizes, ValidTypes } from "../../database/seed-data";

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

interface CartContextProps {
    cart: Cart[]
    addProduct: (product: Cart) => void
    updateCartQuantity: (product: Cart) => void
    removeCartProduct: (product: Cart) => void
    quantity: number
    total: number
    isLoaded: boolean
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps)