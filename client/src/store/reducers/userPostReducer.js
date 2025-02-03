import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPosts: [],
  page: 1,
};

export const userPostSlice = createSlice({
  name: "userposts",
  initialState,
  reducers: {
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    appendUserPosts: (state, action) => {
      state.userPosts = [...state.userPosts, ...action.payload];
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { setUserPosts, appendUserPosts, incrementPage } =
  userPostSlice.actions;
export default userPostSlice.reducer;
