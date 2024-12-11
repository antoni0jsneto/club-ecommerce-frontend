import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from "react";

import { CustomButtonContainer, IconContainer } from "./custom-button.styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    startIcon?: ReactNode;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
    children,
    startIcon,
    ...rest
}) => {
    return (
        <CustomButtonContainer>
            {startIcon && <IconContainer>{startIcon}</IconContainer>}
            {children}
        </CustomButtonContainer>
    );
};

export default CustomButton;
