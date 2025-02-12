import { SERVER_URL } from "./api";

// add courses in Admin
export const addCourseEndpoints = {
  GET_ALL_CATEGORY: SERVER_URL + `/course/get-all-category`,
  ADD_COURSES: SERVER_URL + `/course/add-course`,
  GET_ALL_COURSES: SERVER_URL + `/course/get-all-course`,
  GET_COURSE_BY_CATEGORY: (categoryId) =>
    SERVER_URL + `/course/get-category-course/${categoryId}`,
  GET_FULL_COURSE_DETAILS: (courseId) =>
    SERVER_URL + `/course/get-full_course-details/${courseId}`,
  ADD_CATEGORY: SERVER_URL + `course/add-category`,
};
