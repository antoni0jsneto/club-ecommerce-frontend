import styled from "styled-components";
import Colors from "../../theme/theme.colors";

interface CartContainerProps {
    isVisible: boolean;
}

export const CartHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const ClearCartButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        color: ${Colors.primary};
    }
`;

export const CartContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isVisible",
})<CartContainerProps>`
    position: fixed;
    height: 100vh;
    width: 100vw;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: flex-end;
    visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
    transition: all 0.3s ease;

    p {
        color: ${Colors.text.dark};
        margin-bottom: 0px;
    }
`;

export const CartEscapeArea = styled.div`
    width: 100%;
`;

export const CartContent = styled.div`
    height: 100%;
    min-width: 500px;
    z-index: 200;
    background-color: white;
    padding: 20px;
    overflow-y: scroll;
`;
export const CartTitle = styled.p`
    font-size: 1.325rem;
    font-weight: 600;
    margin-bottom: 15px;
`;
export const CartTotal = styled.p`
    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: 15px;
`;
