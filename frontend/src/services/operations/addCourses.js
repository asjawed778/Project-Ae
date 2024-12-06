import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { addCourseEndpoints } from "../apis";  
import { setLoading } from "../../redux/slices/loadingSlice";
import { setCategories } from "../../redux/slices/adminCategorySlice";
import { setCourses, setCoursesNull } from "../../redux/slices/coursesSlice";
import { setCourseDetails } from "../../redux/slices/courseDetails";
import Cookies from "js-cookie" ;

const { 

    GET_ALL_CATEGORY,
    ADD_COURSES ,
    GET_ALL_COURSES ,
    GET_COURSE_BY_CATEGORY ,
    GET_FULL_COURSE_DETAILS , 
    ADD_CATEGORY ,

} = addCourseEndpoints ;


export function addCategory(data) {
    return async (dispatch, getState) => {
      
        try{

           const response = await apiConnector(
             "POST" ,
             ADD_CATEGORY ,
             data
           )
           
           if( !response.data.success ) {
              throw new Error(response.data.message);
           }
           
            toast.success("Successful") ; 

        } catch(error) {
            
            if( error.response.status === 401 ) {
                toast.error("Unauthorized");
            } else if( error.response.status === 400 ) {
                toast.error("Bad Request: Missing name or descr.")
            } else if( error.response.status === 409 ) {
                toast.error("Conflict: Same name exists") ;
            } else if( error.response.status === 500 ) {
                toast.error("Internal Server Error");
            }

        } finally {
            dispatch(setLoading(false)) ;
        }
    }
}


export function getAllCategory() {
  return async(dispatch, getState) => {
    
    try{
      const response = await apiConnector(
        "GET" ,
         GET_ALL_CATEGORY
      )

      if( !response.data.success ) {
        throw new Error(response.data.message);
      }
      
      //console.log("Success", response.data);
      dispatch(setCategories(response.data.categories)) ;
      

    } catch( error ) {
        
        if( error.response && error.response.status === 404 ) {
            toast.error("Page not found");
        } 
        console.log("categories error",error) ;

    } finally {
        dispatch(setLoading(false)) ;
    } 

  }
}


export function addCourse(payload, resetForm) {
    return async(dispatch, getState) => {
        
        dispatch(setLoading(true)) ;
        const token = Cookies.get("token") ;
        console.log("token in add course", token) ;
        try{
            const response = await apiConnector(
                "POST", 
                ADD_COURSES,
                payload,
                {
                    'Authorization': `Bearer ${token}`  // Send token in Authorization header
                }
            )

            if( !response.data.success ) {
                throw new Error(response.data.message);
            }

            toast.success("Course Added") ;
            console.log("Success man, successfull")
            resetForm() ;

        } catch(error) {
            
            if( error.response && error.response.status === 400 ) {
                toast.error(" Bad Request Validation errors such as missing required fields or invalid file formats.");
            } else if(error.response && error.response.status === 404){
                toast.error(" Category not found ")
            }else if(error.response && error.response.status === 415){
                toast.error(" Unsupported Media Type ")
            }else if(error.response && error.response.status === 500){
                toast.error("Internal Server Error")
            }else if( error.response && error.response.status === 403 ){
                toast.error("You don't have access") ;
            }

            console.log(error) ;

        } finally {
            dispatch(setLoading(false)) ;
        }
    }
}


export function getAllCourses() {
    return async(dispatch, getState) => {

        try{
           const response = await apiConnector(
              "GET" ,
               GET_ALL_COURSES
            )

            if( !response.data.success ) {
                throw new Error(response.data.message);
              }
              
            console.log("Success courses", response);
            //dispatch(getAllCategory()) ;
            dispatch(setCourses(response.data)) ;

            

        }catch(error) {
            if( error.response && error.response.status === 404 ) {
                toast.error("Page not found");
            } 
            console.log(error.response) ;
    
        } finally {
            dispatch(setLoading(false)) ;
        }
    }
}


export function getCourseByCategory(id) {
    return async(dispatch, getState) => {
        console.log("id", id)
        try{
          const response = await apiConnector(
            "GET" , 
            GET_COURSE_BY_CATEGORY(id)
          )
        
          if( !response.data.success ) {
            throw new Error(response.data.message);
            
          }
          console.log(response.data) ;
          dispatch(setCourses(response.data)) ;
          
        } catch(error) {
          if( error.response && error.response.status === 404 ) {
             toast.error("No course found") ;
             dispatch(setCourses([])) ;
          } else if( error.response && error.response.status === 500 ) {
             toast.error("Internal Server Error") ;
          }
        } finally {
            dispatch(setLoading(false)) ;
        }
    }
  
}


export function getCourseDetails(id) {
    return async(dispatch, getState) => {
      
      try{
        const response = await apiConnector(
          "GET" ,
          GET_FULL_COURSE_DETAILS(id)
        )
  
        if( !response.data.success ) {
          throw new Error(response.data.message);
          
        }
        
        dispatch(setCourseDetails(response.data)) ;
        
  
      } catch( error ) {
          
          if( error.response && error.response.status === 404 ) {
              toast.error("Page not found");
          } 
          console.log("categories error",error) ;
  
      } finally {
          dispatch(setLoading(false)) ;
      } 
  
    }
  }