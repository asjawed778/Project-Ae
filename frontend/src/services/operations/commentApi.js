import { commentEndpoints } from "../apis";
import {toast} from 'react-hot-toast' ;
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiConnector } from "../apiConnector";
import { setComments } from "../../redux/slices/commentSlice";

const  {

    ADD_COMMENT ,
    GET_COMMENTS ,
    EDIT_COMMENT ,
    DELETE_COMMENT ,
    VOTE_COMMENT,
    REPLY_TO_COMMENT ,
    EDIT_REPLY ,
    DELETE_REPLY,
    VOTE_REPLY

} = commentEndpoints ;

//add comment 

export function addComment(postId, commentText) {
    return async( dispatch, getState ) => {
      
        // token 
        const token = getState().auth.token ;
        //console.log("token on comment", token) ;
        //console.log("postID", postId) ;
        dispatch(setLoading(true)) ;

        try{
          
            if( !token ) {
                throw new Error(" Token is missing! Please login " )
            }

            const response = await apiConnector(
                "POST", 
                ADD_COMMENT(postId), 
                {
                 comment:commentText.comment
                } ,
                {
                    'Authorization': `Bearer ${token}`  // Send token in Authorization header
                }
               

            )
            
            dispatch(getAllComments(postId)) ;
            toast.success("You scueesfully added the comment")
            // console 
            //console.log("the response of add comment", response) ;

        } catch( error ) {
           
            if (error.response && error.response.status === 400) {
                toast.error("Post ID and comment are required");
            } else if (error.response && error.response.status === 401) {
                toast.error("Unauthorized action");
            } else if (error.response && error.response.status === 404) {
                toast.error("Page not found");
            } else {
                toast.error("Something went wrong. Please try again.");
            }

            //console.log("error while adding comment",  error) ;


        } finally {
            dispatch(setLoading(false)) ;
        }
    }
}

//get all comments 

export function getAllComments( postId ) {
    return async( dispatch, getState ) => {

        const token = getState().auth.token ;
        dispatch(setLoading(true)) ;

        try {
            
            const response = await apiConnector(
                "GET", 
                 GET_COMMENTS(postId) ,
                 null, 
                {
                    'Authorization': `Bearer ${token}`
                }
            )

            if( !response.data.success ) {
                throw new Error( response.data.message) ;
            }
             
            //console.log("comments from api",response.data.comments) ;
            dispatch(setComments({ postId, comments: response.data.comments }));
        } catch ( error ) {
            
            if( error.response && error.response.status === 404 ) {
                toast.error("Page not found");
            } 

        } finally {
            dispatch(setLoading(false)) ;
        }

    }
}

// edit comment 

export function editComment(postId, commentId, updatedComment ) {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "PUT",
                EDIT_COMMENT( postId, commentId ),
                { 
                    "updatedComment" : updatedComment ,

                },
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(getAllComments(postId)); // Refresh the comments after editing
            toast.success("Reply updated successfully!");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Reply not found");
            } else {
                toast.error("Failed to update reply");
            }
            console.error("Error in editing comment:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

// delete comment 

export function deleteComment(postId, commentId ) {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(setLoading(true));
        
        console.log("delete comment", postId, commentId) ;
        try {
            const response = await apiConnector(
                "DELETE",
                DELETE_COMMENT(postId, commentId ),
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(getAllComments(postId)); // Refresh the comments after deletion
            toast.success("comment deleted successfully!");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Reply not found");
            } else {
                toast.error("Failed to delete comment");
            }
           console.error("Error in deleting comment:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

//vote on comment

export function voteComment(postId, commentId, action) {
    return async( dispatch, getState) => {

        const token = getState().auth.token ;
        dispatch(setLoading(true)) ;

        try {

           const response = await apiConnector(
             "POST" ,
             VOTE_COMMENT( postId, commentId) ,
             {
                "action": `${action}`
             } ,
             {
                'Authorization': `Bearer ${token}`
             }

           )

           if( !response.data.success ) {
             throw new Error ( response.data.message ) ;
           }
           
           console.log("vote comemnt", response) ;
           toast.success("your successfully voted up");
           dispatch( getAllComments(postId) ) ;

        } catch (error ) {
           
            if( error.response && error.response.status === 404 ) {
                toast.error( "Page not found" ) ;
            }
            toast.error("there is error") ;
            console.log(error) ;

        } finally {
           dispatch( setLoading(false) ) ; 
        }
    }
}

//reply on comment section

export function replyOnComment( postId, commentId, reply, tagUsername ) {
    return async( dispatch, getState) => {

        const token = getState().auth.token ;
        dispatch(setLoading(true)) ;
        //console.log("comemntid in reply", commentId) ;

        try {

           const response = await apiConnector(
             "POST" ,
             REPLY_TO_COMMENT( postId, commentId) ,
             {
                reply,
                tagUsername,
             } ,
             {
                'Authorization': `Bearer ${token}`
             }

           )

           if( !response.data.success ) {
             throw new Error ( response.data.message ) ;
           }

           dispatch( getAllComments(postId) ) ;

        } catch (error ) {
           
            if( error.response && error.response.status === 404 ) {
                toast.error( "Page not found" ) ;
            }
            //console.log("error in reply", error) ;

        } finally {
           dispatch( setLoading(false) ) ; 
        }
    }

}

// edit your reply 

export function editReply(postId, commentId, replyId, reply, tagUsername ) {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "PUT",
                EDIT_REPLY( postId, commentId, replyId ),
                { 
                    reply  ,
                    tagUsername

                },
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(getAllComments(postId)); // Refresh the comments after editing
            toast.success("Reply updated successfully!");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Reply not found");
            } else {
                toast.error("Failed to update reply");
            }
            //console.error("Error in editing reply:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

// delete your reply 

export function deleteReply(postId, commentId, replyId) {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "DELETE",
                DELETE_REPLY(postId, commentId, replyId),
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(getAllComments(postId)); // Refresh the comments after deletion
            toast.success("Reply deleted successfully!");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Reply not found");
            } else {
                toast.error("Failed to delete reply");
            }
           // console.error("Error in deleting reply:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

// upvote or downvote on reply 

export function voteOnReply( postId, commentId, replyId, voteType ) {
    return async (dispatch, getState) => {

        console.log("vote on reply",postId, commentId, replyId, voteType) ;
        const token = getState().auth.token;
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                VOTE_REPLY(postId, commentId, replyId),
                { 
                    "voteType": `${voteType}` 
                }, // The voteType could be 'upvote' or 'downvote'
                {
                    "Authorization": `Bearer ${token}`
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(getAllComments(postId)); // Refresh the comments and replies to update vote counts
            toast.success("Voted successfully on the reply!");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Reply not found");
            } else {
                toast.error("Failed to vote on reply");
            }
            console.error("Error in voting on reply:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}
