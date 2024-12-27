import Product from "../../../types/product.types";
import CartActionTypes from "./cart.action-types";

interface ToggleCartAction {
    type: typeof CartActionTypes.toggleCart;
}

export const toggleCart = (): ToggleCartAction => ({
    type: CartActionTypes.toggleCart,
});

interface AddProductToCartAction {
    type: typeof CartActionTypes.AddProductToCart;
    payload: Product;
}

export const addProductToCart = (payload: Product): AddProductToCartAction => {
    return {
        type: CartActionTypes.AddProductToCart,
        payload,
    };
};

interface RemoveProductFromCartAction {
    type: typeof CartActionTypes.RemoveProductFromCart;
    payload: string;
}

export const removeProductFromCart = (
    payload: string
): RemoveProductFromCartAction => ({
    type: CartActionTypes.RemoveProductFromCart,
    payload,
});

interface IncreaseProductQuantityAction {
    type: typeof CartActionTypes.IncreaseProductQuantity;
    payload: string;
}

export const increaseProductQuantity = (
    payload: string
): IncreaseProductQuantityAction => ({
    type: CartActionTypes.IncreaseProductQuantity,
    payload,
});

interface DecreaseProductQuantityAction {
    type: typeof CartActionTypes.DecreaseProductQuantity;
    payload: string;
}

export const decreaseProductQuantity = (
    payload: string
): DecreaseProductQuantityAction => ({
    type: CartActionTypes.DecreaseProductQuantity,
    payload,
});

interface ClearProductsAction {
    type: typeof CartActionTypes.ClearProducts;
}

export const clearProducts = (): ClearProductsAction => ({
    type: CartActionTypes.ClearProducts,
});

export type CartActions =
    | ToggleCartAction
    | AddProductToCartAction
    | RemoveProductFromCartAction
    | IncreaseProductQuantityAction
    | DecreaseProductQuantityAction
    | ClearProductsAction;
