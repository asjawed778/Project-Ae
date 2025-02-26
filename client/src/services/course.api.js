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

        return{
          url: "course/thumbnail",
          method: "POST",
          body: formData
        }
      },
    }),
    uploadBrouchure: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("brouchure", file)

        return{
          url: "course/brouchure",
          method: "POST",
          body: formData
        }
      },
    }),
    uploadDetails: builder.mutation({
      query: (data) => ({
          url: "course/details",
          method: "POST",
          body: data 
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
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useAddCourseMutation,
  useGetAllCourseQuery,
  useGetCategoryCourseQuery,
  useGetFullCourseDetailsQuery,
} = apiCourse;