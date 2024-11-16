import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { addCourseEndpoints } from "../apis";  
import { setLoading } from "../../redux/slices/loadingSlice";
import { setCategories } from "../../redux/slices/adminCategorySlice";

const { 

    GET_ALL_CATEGORY,
    ADD_COURSES

} = addCourseEndpoints ;


export function getAllCategory() {
  return async(dispatch, getState) => {
    
    try{
      const response = await apiConnector(
        "GET" ,
         GET_ALL_CATEGORY
      )

      if( !response.data.success ) {
        throw new Error(response.data.message);
        console.log(response.error.message) ;
      }
      
      console.log("Success", response.data);
      dispatch(setCategories(response.data.categories)) ;
      

    } catch( error ) {
        
        if( error.response && error.response.status === 404 ) {
            toast.error("Page not found");
        } 
        console.log(error) ;

    } finally {
        dispatch(setLoading(false)) ;
    } 

  }
}

export function addCourse(payload, resetForm) {
    return async(dispatch, getState) => {
        console.log("Form", payload) ;
        
        try{
            const response = await apiConnector(
                "POST", 
                ADD_COURSES,
                payload
            )

            if( !response.data.success ) {
                throw new Error(response.data.message);
                console.log(response.error.message) ;
            }

            toast.success(response.data.success) ;
            console.log("Success man, successfull")
            resetForm() ;

        } catch(error) {
            
            if( error.response && error.response.status === 400 ) {
                toast.error(" Bad Request  Validation errors such as missing required fields or invalid file formats.");
            } else if(error.response && error.response.status === 404){
                toast.error(" Category not found ")
            }else if(error.response && error.response.status === 415){
                toast.error(" Unsupported Media Type ")
            }else if(error.response && error.response.status === 500){
                toast.error("Internal Server Error")
            } 

            console.log(error.response) ;

        } finally {
            dispatch(setLoading(false)) ;
        }
    }
}
