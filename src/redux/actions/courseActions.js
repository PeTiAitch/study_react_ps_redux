import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses,
  };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        savedCourse.id
          ? dispatch(createCourseSuccess(savedCourse))
          : dispatch(updateCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
