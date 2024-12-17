import { FunctionComponent, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BiChevronLeft } from "react-icons/bi";

// Utilities
import { db } from "../../config/firebase.config";
import Category from "../../types/category.types";

// Components
import Loading from "../loading/loading.component";
import ProductItem from "../product-item/product-item.component";

// Styles
import {
    CategoryTitle,
    Container,
    IconContainer,
    ProductsContainer,
} from "./category-details.styles";
import { useNavigate } from "react-router-dom";

interface CategoryDetailsProps {
    categoryId: string;
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
    categoryId,
}) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    };

    useEffect(() => {
        try {
            setIsLoading(true);

            const fetchCategory = async () => {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "categories"),
                        where("id", "==", categoryId)
                    )
                );

                const category = querySnapshot.docs[0]?.data() as Category;

                setCategory(category);
            };

            fetchCategory();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <Loading />;

    return (
        <Container>
            <CategoryTitle>
                <IconContainer onClick={handleBackClick}>
                    <BiChevronLeft size={36} />
                </IconContainer>
                <p>Explorar {category?.displayName}</p>
            </CategoryTitle>

            <ProductsContainer>
                {category?.products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ProductsContainer>
        </Container>
    );
};

export default CategoryDetails;
