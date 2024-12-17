import {
    createContext,
    FunctionComponent,
    useEffect,
    useMemo,
    useState,
} from "react";

// Utilities
import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
    isVisible: boolean;
    productsTotalPrice: number;
    productsCount: number;
    products: CartProduct[];
    toggleCart: () => void;
    addProductToCart: (product: Product) => void;
    removeProductFromCart: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isVisible: false,
    productsTotalPrice: 0,
    productsCount: 0,
    products: [],
    toggleCart: () => {},
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    increaseProductQuantity: () => {},
    decreaseProductQuantity: () => {},
});

const CartContextProvider: FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [products, setProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        const productsFromLocalStorage = JSON.parse(
            localStorage.getItem("cartProducts")!
        );

        setProducts(productsFromLocalStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(products));
    }, [products]);

    const productsTotalPrice = useMemo(() => {
        return products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );
    }, [products]);

    const productsCount = useMemo(() => {
        return products.reduce((acc, product) => acc + product.quantity, 0);
    }, [products]);

    const toggleCart = () => setIsVisible((prevState) => !prevState);

    const addProductToCart = (product: Product) => {
        const productIsAlreadyInCart = products.some(
            (item) => item.id === product.id
        );

        if (productIsAlreadyInCart) {
            return setProducts((products) =>
                products.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        }

        setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
    };

    const removeProductFromCart = (productId: string) => {
        setProducts((products) =>
            products.filter((product) => product.id !== productId)
        );
    };

    const increaseProductQuantity = (productId: string) => {
        setProducts((products) =>
            products.map((product) =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    const decreaseProductQuantity = (productId: string) => {
        setProducts((products) =>
            products
                .map((product) =>
                    product.id === productId
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
                .filter((product) => product.quantity > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{
                isVisible,
                productsTotalPrice,
                productsCount,
                products,
                toggleCart,
                addProductToCart,
                removeProductFromCart,
                increaseProductQuantity,
                decreaseProductQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
