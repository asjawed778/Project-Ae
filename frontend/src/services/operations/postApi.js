import { postEndpoints } from "../apis";
import {toast} from 'react-hot-toast' ;
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiConnector } from "../apiConnector";
import { setPosts, setError } from "../../redux/slices/postSlice";


const {

    GET_ALL_POSTS ,
    GET_USER_ALL_POST

} = postEndpoints ;

export function getAllPost() {

    return async( dispatch, getState ) => {
       
        console.log("get all function called") ;
        const token = getState().auth.token ;
        console.log("token of get all post", token) ;
        dispatch(setLoading(true)) ;

        try{

            if( !token ) {
                throw new Error("Token is missing! Please login") ;
            }

            const response = await apiConnector("GET", GET_ALL_POSTS,{
                headers: {
                    'Authorization': `Bearer ${token}`  // Send token in Authorization header
                }
            })

            if( !response.data.success) {
                throw new Error(response.data.message) ;
            }
            
            console.log("response of get all post",response.data.posts);
            dispatch(setPosts(response.data.posts)) ;
        
        } catch(error) {
            if (error.response && error.response.status === 400) {
                toast.error("Invalid input or missing required fields.");
              } else if (error.response && error.response.status === 401) {
                toast.error("Unauthorized. Please log in.");
              } else if (error.response && error.response.status === 500) {
                toast.error("Internal server error. Please try again later.");
              } else {
                toast.error("Something went wrong. Please try again.");
              }
              console.log("Error creating post:", error);
            dispatch(setError(error.message)) ;
        } finally {
            dispatch(setLoading(false)) ;
        }
    } ;

}

