import { RootState } from "../../store";

export const selectProductsTotalPrice = (state: RootState) => {
    return state.cartReducer.products.reduce(
        (acc, currentProduct) =>
            acc + currentProduct.price * currentProduct.quantity,
        0
    );
};

export const selectProductsCount = (state: RootState) => {
    return state.cartReducer.products.reduce(
        (acc, currentProduct) => acc + currentProduct.quantity,
        0
    );
};
