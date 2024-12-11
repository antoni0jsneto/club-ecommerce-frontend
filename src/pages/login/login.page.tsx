import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";

// Components
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";

// Styles
import {
    LoginContainer,
    LoginContent,
    LoginHeadLine,
    LoginInputContainer,
    LoginSubtitle,
} from "./login.styles";

const LoginPage = () => {
    return (
        <>
            <Header />

            <LoginContainer>
                <LoginContent>
                    <LoginHeadLine>Entre com a sua conta</LoginHeadLine>

                    <CustomButton startIcon={<BsGoogle size={18} />}>
                        Entrar com o Google
                    </CustomButton>

                    <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

                    <LoginInputContainer>
                        <p>E-mail</p>
                        <CustomInput placeholder="Digite seu e-mail" />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <p>Senha</p>
                        <CustomInput placeholder="Digite sua senha" />
                    </LoginInputContainer>

                    <CustomButton startIcon={<FiLogIn size={18} />}>
                        Entrar
                    </CustomButton>
                </LoginContent>
            </LoginContainer>
        </>
    );
};

export default LoginPage;