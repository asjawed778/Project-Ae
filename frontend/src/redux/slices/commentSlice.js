import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentsByPost: {},  //store comments separately for each post
  loading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.commentsByPost[postId] = comments;  // Set comments for the specific post
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setComments, setError } = commentSlice.actions;

export default commentSlice.reducer;