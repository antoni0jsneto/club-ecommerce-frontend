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
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";

const LoginPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleSubmitPress = (data: any) => {
        console.log(data);
    };

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
                        <CustomInput
                            hasError={!!errors?.email}
                            placeholder="Digite seu e-mail"
                            {...register("email", { required: true })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <p>Senha</p>
                        <CustomInput
                            hasError={!!errors?.password}
                            placeholder="Digite sua senha"
                            {...register("password", { required: true })}
                        />
                    </LoginInputContainer>

                    <CustomButton
                        startIcon={<FiLogIn size={18} />}
                        onClick={() => handleSubmit(handleSubmitPress)()}
                    >
                        Entrar
                    </CustomButton>
                </LoginContent>
            </LoginContainer>
        </>
    );
};

export default LoginPage;
