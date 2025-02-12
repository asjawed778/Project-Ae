import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const apiCourse = createApi({
  reducerPath: "apiCourse",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Courses APIs
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
        url: `course/get-full_course-details/${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  // Courses
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useAddCourseMutation,
  useGetAllCourseQuery,
  useGetCategoryCourseQuery,
  useGetFullCourseDetailsQuery,
} = apiCourse;
