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





// import { SERVER_URL } from "./api";

// //COMMENT ENDPOINTS
// export const commentEndpoints = {
//   ADD_COMMENT: (postId) => `${SERVER_URL}/add-comment/${postId}`,
//   GET_COMMENTS: (postId) => `${SERVER_URL}/get-comments/${postId}`,
//   EDIT_COMMENT: (postId, commentId) =>
//     SERVER_URL + `/edit-comment/${postId}/${commentId}`,
//   DELETE_COMMENT: (postId, commentId) =>
//     `${SERVER_URL}/delete-comment/${postId}/${commentId}`,
//   VOTE_COMMENT: (postId, commentId) =>
//     `${SERVER_URL}/vote-comment/${postId}/${commentId}`, // For voting on a comment

//   REPLY_TO_COMMENT: (postId, commentId) =>
//     `${SERVER_URL}/reply-to-comment/${postId}/${commentId}`, // For replying to a comment
//   EDIT_REPLY: (postId, commentId, replyId) =>
//     `${SERVER_URL}/edit-reply/${postId}/${commentId}/${replyId}`, // For editing a reply
//   DELETE_REPLY: (postId, commentId, replyId) =>
//     `${SERVER_URL}/delete-reply/${postId}/${commentId}/${replyId}`, // For deleting a reply
//   VOTE_REPLY: (postId, commentId, replyId) =>
//     `${SERVER_URL}/vote-reply/${postId}/${commentId}/${replyId}`, // For voting on a reply
// };
