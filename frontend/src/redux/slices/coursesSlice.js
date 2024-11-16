import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courses:[] ,
    loading:false ,
    error:null ,
}

export const courseSlice = createSlice({
    name:"courses" ,
    initialState ,
    reducers:{
        setLoading:(state,action) => {
            state.loading = action.payload ;
        } ,
        setCourses:(state, action) => {
            state.courses = action.payload ;
        } ,
        setError:(state,action) => {
            state.error = action.payload ;
        }
    },
}) ;

export const { setLoading, setCourses, setError } = courseSlice.actions ;
export default courseSlice.reducer ;