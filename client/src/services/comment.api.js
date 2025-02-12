import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const apiComment = createApi({
  reducerPath: "apiComment",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Comments APIs
    addComment: builder.mutation({
      query: () => ({
        url: `add-comment/${postId}`,
        method: "POST",
      }),
    }),
    getComments: builder.mutation({
      query: (postId) => ({
        url: `get-comments/${postId}`,
        method: "GET",
      }),
    }),
    editComment: builder.mutation({
      query: (data) => ({
        url: `edit-comment/${postId}/${commentId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteComment: builder.mutation({
      query: (postId, commentId) => ({
        url: `delete-comment/${postId}/${commentId}`,
        method: "DELETE",
      }),
    }),
    voteComment: builder.mutation({
      query: (postId, commentId) => ({
        url: `vote-comment/${postId}/${commentId}`,
        method: "GET",
      }),
    }),
    replyToComment: builder.mutation({
      query: (postId, commentId) => ({
        url: `reply-to-comment/${postId}/${commentId}`,
        method: "GET",
      }),
    }),
    editReply: builder.mutation({
      query: (postId, commentId, replyId) => ({
        url: `edit-reply/${postId}/${commentId}/${replyId}`,
        method: "PUT",
      }),
    }),
    deleteReply: builder.mutation({
      query: (postId, commentId, replyId) => ({
        url: `delete-reply/${postId}/${commentId}/${replyId}`,
        method: "DELETE",
      }),
    }),
    voteReply: builder.mutation({
      query: (postId, commentId, replyId) => ({
        url: `vote-reply/${postId}/${commentId}/${replyId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  // Comments
} = apiComment;
