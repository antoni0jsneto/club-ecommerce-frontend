import { useContext } from "react";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Styles
import {
    HeaderContainer,
    HeaderItem,
    HeaderItems,
    HeaderTitle,
} from "./header.styles";

// Utilities
import { CartContext } from "../../contexts/cart.context";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { logoutUser } from "../../store/reducers/user/user.actions";
import { useDispatch } from "../../hooks/useDispath.hooks";

const Header = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector(
        (rootReducer: any) => rootReducer.userReducer
    );

    const dispatch = useDispatch();

    const { productsCount, toggleCart } = useContext(CartContext);

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleExploreClick = () => {
        navigate("/explore");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleSignUpClick = () => {
        navigate("/sign-up");
    };

    const handleSignOutClick = () => {
        dispatch(logoutUser());
        signOut(auth);
    };

    return (
        <HeaderContainer>
            <HeaderTitle
                style={{ cursor: "pointer" }}
                onClick={handleHomeClick}
            >
                CLUB CLOTHING
            </HeaderTitle>

            <HeaderItems>
                <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
                {!isAuthenticated && (
                    <>
                        <HeaderItem onClick={handleLoginClick}>
                            Login
                        </HeaderItem>
                        <HeaderItem onClick={handleSignUpClick}>
                            Criar Conta
                        </HeaderItem>
                    </>
                )}

                {isAuthenticated && (
                    <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
                )}

                <HeaderItem onClick={toggleCart}>
                    <BsCart3 size={25} />
                    <p style={{ marginLeft: 5 }}>{productsCount}</p>
                </HeaderItem>
            </HeaderItems>
        </HeaderContainer>
    );
};

export default Header;
