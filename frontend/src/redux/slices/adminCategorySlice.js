import { createSlice } from "@reduxjs/toolkit";
// import { setError } from "./commentSlice";

const initialState = {
  categories: [], // List of all categories
  loading: false, // Indicates if the fetch request is in progress
  error: null,    // Stores any error message
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
        state.loading = action.payload ;
    } ,
    setCategories: (state, action) => {
        state.categories = action.payload;
    } ,
    setError: (state, action) => {
        state.error = action.payload;
    }
  },
});

export const { setLoading, setCategories, setError } = categorySlice.actions;

export default categorySlice.reducer;
