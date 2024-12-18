import { FunctionComponent, useContext } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Components
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

// Utilities
import { CartContext } from "../../contexts/cart.context";

// Styles
import {
    CartContainer,
    CartContent,
    CartEscapeArea,
    CartTitle,
    CartTotal,
} from "./cart.styles";

const Cart: FunctionComponent = () => {
    const {
        isVisible,
        productsTotalPrice,
        productsCount,
        products,
        toggleCart,
    } = useContext(CartContext);

    const navigate = useNavigate();

    const handleGoToCheckoutClick = () => {
        navigate("/checkout");
        toggleCart();
    };

    return (
        <CartContainer isVisible={isVisible}>
            <CartEscapeArea onClick={toggleCart} />
            <CartContent>
                <CartTitle>Seu Carrinho</CartTitle>

                {products.map((product) => (
                    <CartItem key={product.id} product={product} />
                ))}

                {productsCount > 0 ? (
                    <>
                        <CartTotal>Total: R$ {productsTotalPrice}</CartTotal>

                        <CustomButton
                            startIcon={<BsCartCheck />}
                            onClick={handleGoToCheckoutClick}
                        >
                            Ir para o Checkout
                        </CustomButton>
                    </>
                ) : (
                    <p>Seu carrinho está vazio!</p>
                )}
            </CartContent>
        </CartContainer>
    );
};

export default Cart;
