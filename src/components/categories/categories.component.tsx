import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.config";

// Components
import CategoryItem from "../category-item/category-item.component";

// Styles
import "./categories.styles.css";

// Utilities
import Category from "../../types/category.types";

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
            const categoriesFromFirestore: Category[] = [];

            const querySnapshot = await getDocs(collection(db, "categories"));

            querySnapshot.forEach((doc) => {
                categoriesFromFirestore.push(doc.data() as Category);
            });

            setCategories(categoriesFromFirestore);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="categories-container">
            <div className="categories-content">
                {categories.map((category) => (
                    <div key={category.id}>
                        <CategoryItem category={category} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
