import { createContext, FunctionComponent, useState } from "react";
import Category from "../types/category.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";

interface ICategoryContext {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    isLoading: boolean;
}

export const CategoryContext = createContext<ICategoryContext>({
    categories: [],
    fetchCategories: () => Promise.resolve(),
    isLoading: false,
});

const CategoryContextProvider: FunctionComponent<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);

            const categoriesFromFirestore: Category[] = [];

            const querySnapshot = await getDocs(collection(db, "categories"));

            querySnapshot.forEach((doc) => {
                categoriesFromFirestore.push(doc.data() as Category);
            });

            setCategories(categoriesFromFirestore);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CategoryContext.Provider
            value={{ categories, fetchCategories, isLoading }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContextProvider;
