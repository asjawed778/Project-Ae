import { SERVER_URL } from "./api";

// CREATE POST ENDPOINTS
export const createPostEndpoints = {
  CREATE_POST_API: SERVER_URL + "/create-post",
  EDIT_POST_API: (postId) => `${SERVER_URL}/update-post/${postId}`,
  DELETE_POST_API: (postId) => `${SERVER_URL}/delete-post/${postId}`,
};

//POST ENDPOINTS
export const postEndpoints = {
  GET_ALL_POSTS: SERVER_URL + `/get-all-post`,
  GET_USER_ALL_POST: SERVER_URL + "/get-user-all-post",
  VOTE_POST: (postId) => SERVER_URL + `/vote-post/${postId}`,
  DELETE_POST: (postId) => SERVER_URL + `/delete-post/${postId}`,
};
