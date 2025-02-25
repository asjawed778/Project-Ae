import { SERVER_URL } from "./api";

//COMMENT ENDPOINTS
export const commentEndpoints = {
  ADD_COMMENT: (postId) => `${SERVER_URL}/add-comment/${postId}`,
  GET_COMMENTS: (postId) => `${SERVER_URL}/get-comments/${postId}`,
  EDIT_COMMENT: (postId, commentId) =>
    SERVER_URL + `/edit-comment/${postId}/${commentId}`,
  DELETE_COMMENT: (postId, commentId) =>
    `${SERVER_URL}/delete-comment/${postId}/${commentId}`,
  VOTE_COMMENT: (postId, commentId) =>
    `${SERVER_URL}/vote-comment/${postId}/${commentId}`, // For voting on a comment

  REPLY_TO_COMMENT: (postId, commentId) =>
    `${SERVER_URL}/reply-to-comment/${postId}/${commentId}`, // For replying to a comment
  EDIT_REPLY: (postId, commentId, replyId) =>
    `${SERVER_URL}/edit-reply/${postId}/${commentId}/${replyId}`, // For editing a reply
  DELETE_REPLY: (postId, commentId, replyId) =>
    `${SERVER_URL}/delete-reply/${postId}/${commentId}/${replyId}`, // For deleting a reply
  VOTE_REPLY: (postId, commentId, replyId) =>
    `${SERVER_URL}/vote-reply/${postId}/${commentId}/${replyId}`, // For voting on a reply
};
