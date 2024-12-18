import { FunctionComponent, useContext, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import axios from "axios";

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
import Loading from "../loading/loading.component";

const Checkout: FunctionComponent = () => {
    const { products, productsTotalPrice } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleFinishPurchaseClick = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL!}/create-checkout-session`,
                {
                    products,
                }
            );

            window.location.href = data.url;
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading />}

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

                        <CustomButton
                            startIcon={<BsBagCheck />}
                            onClick={handleFinishPurchaseClick}
                        >
                            Finalizar Compra
                        </CustomButton>
                    </>
                ) : (
                    <p>Seu carrinho está vazio</p>
                )}
            </CheckoutContainer>
        </>
    );
};

export default Checkout;
