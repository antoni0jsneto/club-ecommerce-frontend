import { FunctionComponent } from "react";

// Utilities
import Category from "../../types/category.types";

// Styles
import {
    CategoryContainer,
    CategoryTitle,
    ProductsContainer,
} from "./category-overview.styles";

interface CategoryOverviewProps {
    category: Category;
}

const CategoryOverview: FunctionComponent<CategoryOverviewProps> = ({
    category,
}) => {
    return (
        <CategoryContainer>
            <CategoryTitle>{category.displayName}</CategoryTitle>

            <ProductsContainer></ProductsContainer>
        </CategoryContainer>
    );
};

export default CategoryOverview;
