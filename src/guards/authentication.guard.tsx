import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import { UserContext } from "../contexts/user.context";

// Components
import Header from "../components/header/header.component";
import Loading from "../components/loading/loading.component";

const AuthenticationGuard: FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                navigate("/login");
            }, 4000);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <>
                <Header />

                <Loading message="Você precisa estar logado para acessar essa página. Você será redirecionado para a página de login em breve." />
            </>
        );
    }

    return <>{children}</>;
};

export default AuthenticationGuard;
