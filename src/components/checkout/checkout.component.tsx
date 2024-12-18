import { FunctionComponent, useContext } from "react";
import { BsBagCheck } from "react-icons/bs";

// Utilities
import { CartContext } from "../../contexts/cart.context";

// Styles
import {
    CheckoutContainer,
    CheckoutProducts,
    CheckoutTitle,
    CheckoutTotal,
} from "./checkout.styles";

// Components
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

const Checkout: FunctionComponent = () => {
    const { products, productsTotalPrice } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutTitle>Checkout</CheckoutTitle>

            <CheckoutProducts>
                {products.map((product) => (
                    <CartItem key={product.id} product={product} />
                ))}
            </CheckoutProducts>

            {products.length > 0 ? (
                <>
                    <CheckoutTotal>
                        Total: R$ {productsTotalPrice}
                    </CheckoutTotal>

                    <CustomButton startIcon={<BsBagCheck />}>
                        Finalizar Compra
                    </CustomButton>
                </>
            ) : (
                <p>Seu carrinho está vazio</p>
            )}
        </CheckoutContainer>
    );
};

export default Checkout;
