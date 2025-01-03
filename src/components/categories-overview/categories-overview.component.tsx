import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";

// Styles
import { Container } from "./categories-overview.styles";

// Components
import CategoryOverview from "../category-overview/category-overview.component";
import Loading from "../loading/loading.component";

// Utilities
import { fetchCategories } from "../../store/toolkit/category/category.slice";
import { useAppSelector } from "../../hooks/redux.hooks";

const CategoriesOverview: FunctionComponent = () => {
    const { isLoading, categories } = useAppSelector(
        (state) => state.categoryReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories() as any);
        }
    }, []);

    if (isLoading) return <Loading />;

    return (
        <Container>
            {categories.map((category) => (
                <CategoryOverview key={category.id} category={category} />
            ))}
        </Container>
    );
};

export default CategoriesOverview;
