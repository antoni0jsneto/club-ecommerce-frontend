import { Dispatch } from "redux";
import Category from "../../../types/category.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import CategoryActionTypes from "./category.action-types";

export const fetchCategories = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES_START });

        try {
            const categoriesFromFirestore: Category[] = [];

            const querySnapshot = await getDocs(collection(db, "categories"));

            querySnapshot.forEach((doc) => {
                categoriesFromFirestore.push(doc.data() as Category);
            });

            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
                payload: categoriesFromFirestore,
            });
        } catch (error) {
            dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE });
        }
    };
};
