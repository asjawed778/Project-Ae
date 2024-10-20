import { toast } from 'react-hot-toast';
import { createPostEndpoints } from '../apis';
import { setLoading } from '../../redux/slices/loadingSlice';
import { apiConnector } from '../apiConnector';

//Endpoints to create post 
const  {

    CREATE_POST_API,
    EDIT_POST_API ,
    DELETE_POST_API,

} = createPostEndpoints ;

export function createPost( postData ) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {

        // Send POST request to create a new post
        const response = await apiConnector("POST", CREATE_POST_API, postData);
  
        // Check if response is unsuccessful
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // On success, show a toast notification
        toast.success("Post created successfully");
  
       
      } catch (error) {

        // Error handling based on status codes
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
        dispatch(setLoading(false));
      }
    }
}