import Cookies from "js-cookie" ;

const token = Cookies.get("token") ;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// USER AUTH ENDPOINTS
export const userAuthEndpoints = {
    SEND_SIGNUP_OTP_API: SERVER_URL + "/send-signup-otp",
    VERIFY_SIGNUP_OTP_API: SERVER_URL + "/verify-signup-otp",
    LOGIN_API: SERVER_URL + "/login",
    LOGOUT_API: SERVER_URL + "/logout",
    UPDATE_PASSWORD_API: SERVER_URL + "/update-password",
    SEND_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/send-forgotPassword-otp",
    VERIFY_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/verify-forgotPassword-otp"
}

// CREATE POST ENDPOINTS
export const createPostEndpoints = {
    CREATE_POST_API: SERVER_URL + "/create-post" ,
    EDIT_POST_API: (postId) => `${SERVER_URL}/update-post/${postId}`,
    DELETE_POST_API: (postId) => `${SERVER_URL}/delete-post/${postId}`
}

//POST ENDPOINTS
export const postEndpoints = {
   GET_ALL_POSTS:  SERVER_URL + `/get-all-post?token=${token}`,
   GET_USER_ALL_POST: SERVER_URL + "/get-user-all-post"

}

//COMMENT ENDPOINTS
export const commentEndpoints = {
    
    ADD_COMMENT: (postId) => `${SERVER_URL}/add-comment/${postId}`,
    GET_COMMENTS: (postId) => `${SERVER_URL}/get-comments/${postId}`,
    DELETE_COMMENT: (commentId) => `${SERVER_URL}/delete-comment/${commentId}` ,
    VOTE_COMMENT: ( postId, commentId ) => `${SERVER_URL}/vote-comment/${postId}/${commentId}`, // For voting on a comment

    REPLY_TO_COMMENT: (postId, commentId) => `${SERVER_URL}/reply-to-comment/${postId}/${commentId}`, // For replying to a comment
    EDIT_REPLY: (postId, commentId, replyId) => `${SERVER_URL}/edit-reply/${postId}/${commentId}/${replyId}`, // For editing a reply
    DELETE_REPLY: (postId, commentId, replyId) => `${SERVER_URL}/delete-reply/${postId}/${commentId}/${replyId}`, // For deleting a reply
    VOTE_REPLY: (postId, commentId, replyId ) => `${SERVER_URL}/vote-reply/${postId}/${commentId}/${replyId}`, // For voting on a reply
};

  
