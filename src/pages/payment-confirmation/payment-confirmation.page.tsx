import { FunctionComponent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineHome,
} from "react-icons/ai";

// Styles
import {
    PaymentConfirmationContainer,
    PaymentConfirmationContent,
} from "./payment-confirmation.styles";

// Components
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// Utilities
import Colors from "../../theme/theme.colors";
import { useDispatch } from "react-redux";
import { clearProducts } from "../../store/reducers/cart/cart.actions";

const PaymentConfirmationPage: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    const status = searchParams.get("success");
    const isCanceled = searchParams.get("canceled") === "true";

    const navigate = useNavigate();

    useEffect(() => {
        if (status === "true") {
            dispatch(clearProducts());
        }
    }, [status]);

    const handleGoToHomePageClick = () => {
        navigate("/");
    };

    return (
        <>
            <Header />

            <PaymentConfirmationContainer>
                <PaymentConfirmationContent>
                    {status === "true" && (
                        <>
                            <AiOutlineCheckCircle
                                size={120}
                                color={Colors.success}
                            />
                            <p>Sua compra foi finalizada com sucesso!</p>
                        </>
                    )}

                    {(status === "false" || isCanceled) && (
                        <>
                            <AiOutlineCloseCircle
                                size={120}
                                color={Colors.error}
                            />
                            <p>
                                Ocorreu um erro ao finalizar a sua compra. Por
                                favor, tente novamente mais tarde.
                            </p>
                        </>
                    )}

                    <CustomButton
                        startIcon={<AiOutlineHome />}
                        onClick={handleGoToHomePageClick}
                    >
                        Ir para a Página Inicial
                    </CustomButton>
                </PaymentConfirmationContent>
            </PaymentConfirmationContainer>
        </>
    );
};

export default PaymentConfirmationPage;
