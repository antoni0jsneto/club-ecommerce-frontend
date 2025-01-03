import { FunctionComponent, useContext } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Components
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

// Styles
import {
    CartContainer,
    CartContent,
    CartEscapeArea,
    CartHeader,
    CartTitle,
    CartTotal,
    ClearCartButton,
} from "./cart.styles";

// Utilities
import { useAppSelector } from "../../hooks/redux.hooks";
import { clearProducts, toggleCart } from "../../store/toolkit/cart/cart.slice";
import {
    selectProductsCount,
    selectProductsTotalPrice,
} from "../../store/reducers/cart/cart.selectors";
import { useDispatch } from "../../hooks/useDispath.hooks";

const Cart: FunctionComponent = () => {
    const { isVisible, products } = useAppSelector(
        (state) => state.cartReducer
    );

    const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

    const productsCount = useAppSelector(selectProductsCount);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleGoToCheckoutClick = () => {
        navigate("/checkout");
        dispatch(toggleCart());
    };

    const handleEscapeAreaClick = () => {
        dispatch(toggleCart());
    };

    const handleClearCartClick = () => {
        dispatch(clearProducts());
    };

    return (
        <CartContainer isVisible={isVisible}>
            <CartEscapeArea onClick={handleEscapeAreaClick} />
            <CartContent>
                <CartHeader className="cart-header">
                    <CartTitle>Seu Carrinho</CartTitle>

                    {productsCount > 0 && (
                        <ClearCartButton
                            className="clear-cart"
                            onClick={handleClearCartClick}
                        >
                            Limpar Carrinho
                        </ClearCartButton>
                    )}
                </CartHeader>

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
