import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courseDetails:[] ,
    loading:false ,
    error:null ,
}

export const courseDetailsSlice = createSlice({
    name:"courseDetails" ,
    initialState ,
    reducers:{
        setLoading:(state,action) => {
            state.loading = action.payload ;
        } ,
        setCourseDetails:(state, action) => {
            state.courseDetails = action.payload ;
        } ,
        setError:(state,action) => {
            state.error = action.payload ;
        }
    },
}) ;

export const { setLoading, setCourseDetails, setError } = courseDetailsSlice.actions ;
export default courseDetailsSlice.reducer ;