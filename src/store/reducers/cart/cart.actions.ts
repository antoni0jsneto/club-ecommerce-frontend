import Product from "../../../types/product.types";
import CartActionTypes from "./cart.action-types";

export const toggleCart = () => ({ type: CartActionTypes.toggleCart });

export const addProductToCart = (payload: Product) => {
    return {
        type: CartActionTypes.AddProductToCart,
        payload,
    };
};

export const removeProductFromCart = (payload: string) => ({
    type: CartActionTypes.RemoveProductFromCart,
    payload,
});

export const increaseProductQuantity = (payload: string) => ({
    type: CartActionTypes.IncreaseProductQuantity,
    payload,
});

export const decreaseProductQuantity = (payload: string) => ({
    type: CartActionTypes.DecreaseProductQuantity,
    payload,
});

export const clearProducts = () => ({ type: CartActionTypes.ClearProducts });
