import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import {
    AuthError,
    AuthErrorCodes,
    signInWithEmailAndPassword,
    signInWithPopup,
    User,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import validator from "validator";
import { useForm } from "react-hook-form";
import InputErrorMessage from "../../components/input-error-message/input-error-message.component";

// Styles
import {
    LoginContainer,
    LoginContent,
    LoginHeadLine,
    LoginInputContainer,
    LoginSubtitle,
} from "./login.styles";

// Utilities
import { auth, db, googleProvider } from "../../config/firebase.config";
import { UserContext } from "../../contexts/user.context";

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginForm>();

    const { isAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const handleSubmitPress = async (data: LoginForm) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log(userCredentials);
        } catch (error) {
            console.log(error);
            const _error = error as AuthError;

            if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
                setError("password", {
                    type: "mismatch",
                });
                setError("email", {
                    type: "mismatch",
                });
                return false;
            }
        }
    };

    const handleSignInWithGooglePress = async () => {
        try {
            const userCredentials = await signInWithPopup(auth, googleProvider);

            const querySnapshot = await getDocs(
                query(
                    collection(db, "users"),
                    where("id", "==", userCredentials.user.uid)
                )
            );

            const user = querySnapshot.docs[0]?.data() as User;

            if (!user) {
                await addDoc(collection(db, "users"), {
                    id: userCredentials.user.uid,
                    email: userCredentials.user.email,
                    firstName: userCredentials.user.displayName?.split(" ")[0],
                    lastName: userCredentials.user.displayName?.split(" ")[1],
                    provider: "google",
                });
            }

            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />

            <LoginContainer>
                <LoginContent>
                    <LoginHeadLine>Entre com a sua conta</LoginHeadLine>

                    <CustomButton
                        startIcon={<BsGoogle size={18} />}
                        onClick={handleSignInWithGooglePress}
                    >
                        Entrar com o Google
                    </CustomButton>

                    <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

                    <LoginInputContainer>
                        <p>E-mail</p>
                        <CustomInput
                            hasError={!!errors?.email}
                            placeholder="Digite seu e-mail"
                            {...register("email", {
                                required: true,
                                validate: (value) => {
                                    return validator.isEmail(value);
                                },
                            })}
                        />

                        {errors?.email?.type === "required" && (
                            <InputErrorMessage>
                                O e-mail é obrigatório.
                            </InputErrorMessage>
                        )}

                        {errors?.email?.type === "validate" && (
                            <InputErrorMessage>
                                Por favor, insira um e-mail válido.
                            </InputErrorMessage>
                        )}
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <p>Senha</p>
                        <CustomInput
                            hasError={!!errors?.password}
                            placeholder="Digite sua senha"
                            type="password"
                            {...register("password", { required: true })}
                        />

                        {errors?.password?.type === "required" && (
                            <InputErrorMessage>
                                A senha é obrigatória.
                            </InputErrorMessage>
                        )}

                        {errors?.password?.type === "mismatch" && (
                            <InputErrorMessage>
                                E-mail ou Senha inválidos.
                            </InputErrorMessage>
                        )}
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
function singleSignIn(email: string, password: string) {
    throw new Error("Function not implemented.");
}
