import { toast } from 'react-hot-toast';
import { createPostEndpoints } from '../apis';
import { setLoading } from '../../redux/slices/loadingSlice';
import { apiConnector } from '../apiConnector';
import Cookies from "js-cookie" ;

//Endpoints to create post 
const  {

    CREATE_POST_API,
    EDIT_POST_API ,
    DELETE_POST_API,

} = createPostEndpoints ;


export function createPost( postData ) {
   
    return async (dispatch, getState) => {
      // Step 1: Retrieve token from Redux state
      const token = getState().auth.token; // Ensure the correct slice name (auth) is used here
      console.log("Token from Redux:", token);
  
      dispatch(setLoading(true));
      
      try {
        // Step 2: Check if token exists
        if (!token) {
          throw new Error("Token is missing! Please log in.");
        }
  
        // Step 3: Send POST request to create a new post with the token in headers
        // Auhtorization is not working
        const response = await apiConnector("POST", CREATE_POST_API, postData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(response) ;
        // Step 4: Check if response is unsuccessful
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // On success, show a toast notification
        toast.success("Post created successfully");
  
      } catch (error) {
        // Step 5: Handle errors and show appropriate error messages
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
  
      } finally {
        // Step 6: Stop loading spinner/action
        dispatch(setLoading(false));
      }
    };
}