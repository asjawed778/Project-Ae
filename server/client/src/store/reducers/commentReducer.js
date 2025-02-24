import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentsByPost: {}, //store comments separately for each post
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.commentsByPost[postId] = comments; // Set comments for the specific post
    },
  },
});

export const { setLoading, setComments, setError } = commentSlice.actions;

export default commentSlice.reducer;
