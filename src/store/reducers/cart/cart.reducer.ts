import CartProduct from "../../../types/cart.types";
import CartActionTypes from "./cart.action-types";

interface InitialState {
    isVisible: boolean;
    products: CartProduct[];
}

const initialState: InitialState = {
    isVisible: false,
    products: [],
};

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CartActionTypes.toggleCart:
            return { ...state, isVisible: !state.isVisible };

        case CartActionTypes.AddProductToCart: {
            const product = action.payload;

            const productIsAlreadyInCart = state.products.some(
                (item) => item.id === product.id
            );

            if (productIsAlreadyInCart) {
                return {
                    ...state,
                    products: state.products.map((item) =>
                        item.id === product.id
                            ? { ...product, quantity: product.quantity + 1 }
                            : product
                    ),
                };
            }

            return {
                ...state,
                products: [...state.products, { ...product, quantity: 1 }],
            };
        }

        case CartActionTypes.RemoveProductFromCart: {
            const productId = action.payload;

            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== productId
                ),
            };
        }

        case CartActionTypes.IncreaseProductQuantity: {
            const productId = action.payload;

            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === productId
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                ),
            };
        }

        case CartActionTypes.DecreaseProductQuantity: {
            const productId = action.payload;

            return {
                ...state,
                products: state.products
                    .map((product) =>
                        product.id === productId
                            ? { ...product, quantity: product.quantity - 1 }
                            : product
                    )
                    .filter((product) => product.quantity > 0),
            };
        }

        case CartActionTypes.ClearProducts:
            return {
                ...state,
                products: [],
            };

        default:
            return state;
    }
};

export default cartReducer;
