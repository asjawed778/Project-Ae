import { toast } from "react-hot-toast";
import { apiConnector } from "../api";
import { addCourseEndpoints } from "../course.api";
import { setCategories } from "../../store/reducers/adminCategoryReducer";
import { setCourses } from "../../store/reducers/coursesReducer";

const {
  GET_ALL_CATEGORY,
  ADD_COURSES,
  GET_ALL_COURSES,
  GET_COURSE_BY_CATEGORY,
  GET_FULL_COURSE_DETAILS,
  ADD_CATEGORY,
} = addCourseEndpoints;

export function addCategory(data) {
  return async (dispatch, getState) => {
    try {
      const response = await apiConnector("POST", ADD_CATEGORY, data);

      if (!response.data.success) {
        console.log(response.error.message);
        throw new Error(response.data.message);
      }

      toast.success("Successful");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Unauthorized");
      } else if (error.response.status === 400) {
        toast.error("Bad Request: Missing name or descr.");
      } else if (error.response.status === 409) {
        toast.error("Conflict: Same name exists");
      } else if (error.response.status === 500) {
        toast.error("Internal Server Error");
      }
    }
  };
}

export function getAllCategory() {
  return async (dispatch, getState = 0) => {
    try {
      const response = await apiConnector("GET", GET_ALL_CATEGORY);

      if (!response.data.success) {
        console.log(response.error.message);
        throw new Error(response.data.message);
      }

      dispatch(setCategories(response.data.categories));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Page not found");
      }
      console.log("categories error", error);
    }
  };
}

export function addCourse(payload, resetForm) {
  return async (dispatch, getState) => {
    try {
      const response = await apiConnector("POST", ADD_COURSES, payload);

      if (!response.data.success) {
        console.log(response.error.message);
        throw new Error(response.data.message);
      }

      toast.success(response.data.success);
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          " Bad Request  Validation errors such as missing required fields or invalid file formats."
        );
      } else if (error.response && error.response.status === 404) {
        toast.error(" Category not found ");
      } else if (error.response && error.response.status === 415) {
        toast.error(" Unsupported Media Type ");
      } else if (error.response && error.response.status === 500) {
        toast.error("Internal Server Error");
      }

      console.log(error.response);
    }
  };
}

export function getAllCourses() {
  return async (dispatch, getState) => {
    try {
      const response = await apiConnector("GET", GET_ALL_COURSES);

      if (!response.data.success) {
        console.log(response.error.message);
        throw new Error(response.data.message);
      }

      //dispatch(getAllCategory()) ;
      dispatch(setCourses(response.data));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Page not found");
      }
      console.log(error.response);
    }
  };
}

export function getCourseByCategory(id) {
  return async (dispatch, getState) => {
    try {
      const response = await apiConnector("GET", GET_COURSE_BY_CATEGORY(id));

      if (!response.data.success) {
        console.log(response.error.message);
        throw new Error(response.data.message);
      }
      dispatch(setCourses(response.data));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No course found");
      } else if (error.response && error.response.status === 500) {
        toast.error("Internal Server Error");
      }
    }
  };
}
