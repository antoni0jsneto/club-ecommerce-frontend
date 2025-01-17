import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks/useDispath.hooks";

// Styles
import {
    HeaderContainer,
    HeaderItem,
    HeaderItems,
    HeaderTitle,
} from "./header.styles";

// Utilities
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { logoutUser } from "../../store/toolkit/user/user.slice";
import { toggleCart } from "../../store/toolkit/cart/cart.slice";
import { useAppSelector } from "../../hooks/redux.hooks";
import { selectProductsCount } from "../../store/reducers/cart/cart.selectors";

const Header = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector(
        (rootReducer: any) => rootReducer.userReducer
    );

    const dispatch = useDispatch();

    const productsCount = useAppSelector(selectProductsCount);

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

    const handleCartClick = () => {
        dispatch(toggleCart());
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

                <HeaderItem onClick={handleCartClick}>
                    <BsCart3 size={25} />
                    <p style={{ marginLeft: 5 }}>{productsCount}</p>
                </HeaderItem>
            </HeaderItems>
        </HeaderContainer>
    );
};

export default Header;
