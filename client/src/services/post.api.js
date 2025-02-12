import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const apiPost = createApi({
  reducerPath: "apiPost",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Posts APIs
    createPost: builder.mutation({
      query: (data) => ({
        url: `create-post`,
        method: "POST",
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: (data, postId) => ({
        url: `update-post/${postId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `delete-post/${postId}`,
        method: "DELETE",
      }),
    }),
    getAllPost: builder.mutation({
      query: () => ({
        url: "get-all-post",
        method: "GET",
      }),
    }),
    getUserAllPost: builder.mutation({
      query: () => ({
        url: "get-user-all-post",
        method: "GET",
      }),
    }),
    votePost: builder.mutation({
      query: (data) => ({
        url: `/vote-post/${postId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  // Posts
} = apiPost;
