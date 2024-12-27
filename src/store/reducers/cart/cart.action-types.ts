const CartActionTypes = {
    toggleCart: "cart/toggle" as const,
    AddProductToCart: "cart/addProduct" as const,
    RemoveProductFromCart: "cart/removeProduct" as const,
    IncreaseProductQuantity: "cart/increaseProductQuantity" as const,
    DecreaseProductQuantity: "cart/decreaseProductQuantity" as const,
    ClearProducts: "cart/clearProducts" as const,
};

export default CartActionTypes;
