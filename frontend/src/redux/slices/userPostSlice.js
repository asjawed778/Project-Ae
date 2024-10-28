import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPosts: [],
  loading: false,
  error: null,
  page: 1,
};

export const userPostSlice = createSlice({
  name: 'userposts',
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    appendUserPosts: (state, action) => {
      state.userPosts = [...state.userPosts, ...action.payload];
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { setUserLoading, setUserPosts, appendUserPosts, setUserError, incrementPage } = userPostSlice.actions;
export default userPostSlice.reducer;
