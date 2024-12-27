import { FunctionComponent } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// Styles
import {
    CartItemContainer,
    CartItemImage,
    CartItemInfo,
    CartItemQuantity,
    RemoveButton,
} from "./cart-item.styles";

// Utilities
import CartProduct from "../../types/cart.types";
import {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
} from "../../store/reducers/cart/cart.actions";
import { useDispatch } from "../../hooks/useDispath.hooks";

interface CartItemProps {
    product: CartProduct;
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleRemoveClick = () => {
        dispatch(removeProductFromCart(product.id));
    };

    const handleIncreaseClick = () => {
        dispatch(increaseProductQuantity(product.id));
    };

    const handleDecreaseClick = () => {
        dispatch(decreaseProductQuantity(product.id));
    };

    return (
        <CartItemContainer>
            <CartItemImage imageUrl={product.imageUrl} />

            <CartItemInfo>
                <p>{product.name}</p>
                <p>R$ {product.price}</p>

                <CartItemQuantity>
                    <AiOutlineMinus size={20} onClick={handleDecreaseClick} />
                    <p>{product.quantity}</p>
                    <AiOutlinePlus size={20} onClick={handleIncreaseClick} />
                </CartItemQuantity>
            </CartItemInfo>

            <RemoveButton onClick={handleRemoveClick}>
                <AiOutlineClose size={25} />
            </RemoveButton>
        </CartItemContainer>
    );
};

export default CartItem;
