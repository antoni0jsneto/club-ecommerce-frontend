import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category from "../../../types/category.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase.config";

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async () => {
        const categoriesFromFirestore: Category[] = [];

        const querySnapshot = await getDocs(collection(db, "categories"));

        querySnapshot.forEach((doc) => {
            categoriesFromFirestore.push(doc.data() as Category);
        });

        return categoriesFromFirestore;
    }
);

interface InitialState {
    categories: Category[];
    isLoading: boolean;
}

const initialState: InitialState = {
    categories: [],
    isLoading: false,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default categorySlice.reducer;
