import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const apiCourse = createApi({
  reducerPath: "apiCourse",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Courses APIs
    uploadThumbnail: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("thumbnail", file)
        const accessToken = localStorage.getItem("accessToken");
        
        return{
          url: "course/thumbnail",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
          },
          credentials: "include",
        }
      },
    }),
    uploadBrouchure: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("brouchure", file)
        const accessToken = localStorage.getItem("accessToken");

        return{
          url: "course/brouchure",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
          },
          credentials: "include",
        }
      },
    }),
    uploadDetails: builder.mutation({
      query: (data) =>{
        
        return{
          url: "course/details",
          method: "POST",
          body: data,
          credentials: "include", 
      }},
    }),
    uploadAdditionalDetails: builder.mutation({
      query: ({data, id}) =>{
        return{
          url: `course/additional-details/${id}`,
          method: "PUT",
          body: data,
          credentials: "include", 
      }},
    }),
    uploadCourseStructure: builder.mutation({
      query: ({data, id}) =>{
        return{
          url: `course/structure/${id}`,
          method: "PUT",
          body: data,
          credentials: "include", 
      }},
    }),
    publishCourse: builder.mutation({
      query: ({id}) =>{
        return{
          url: `course/publish/${id}`,
          method: "POST",
          credentials: "include", 
      }},
    }),
    getDropdownOptions: builder.query({
      query: (endpoint) => ({
        url: endpoint,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "course/get-all-category",
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "course/add-category",
        method: "POST",
        body: data,
      }),
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "course/add-course",
        method: "POST",
        body: data,
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: `course/get-all-course`,
        method: "GET",
      }),
    }),
    getCategoryCourse: builder.query({
      query: (categoryId) => ({
        url: `course/get-category-course/${categoryId}`,
        method: "GET",
      }),
    }),
    getFullCourseDetails: builder.query({
      query: (courseId) => ({
        url: `course/get-full-course-details/${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  // Courses
  useUploadThumbnailMutation,
  useUploadBrouchureMutation,
  useUploadDetailsMutation,
  useUploadAdditionalDetailsMutation,
  useUploadCourseStructureMutation,
  usePublishCourseMutation,
  useGetDropdownOptionsQuery,
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useAddCourseMutation,
  useGetAllCourseQuery,
  useGetCategoryCourseQuery,
  useGetFullCourseDetailsQuery,
} = apiCourse;