import { FunctionComponent, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "../../hooks/useDispath.hooks";

// Utilities
import Product from "../../types/product.types";
import { addProductToCart } from "../../store/toolkit/cart/cart.slice";

// Styles
import {
    ProductContainer,
    ProductImage,
    ProductInfo,
} from "./product-item.styles";

// Components
import CustomButton from "../custom-button/custom-button.component";

interface ProductItemProps {
    product: Product;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCartClick = () => {
        dispatch(addProductToCart(product));
    };

    return (
        <ProductContainer>
            <ProductImage imageUrl={product.imageUrl}>
                <CustomButton
                    startIcon={<BsCartPlus />}
                    onClick={handleAddToCartClick}
                >
                    Adicionar ao carrinho
                </CustomButton>
            </ProductImage>

            <ProductInfo>
                <p>{product.name}</p>
                <p>R$ {product.price}</p>
            </ProductInfo>
        </ProductContainer>
    );
};

export default ProductItem;
