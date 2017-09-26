import types from './actionTypes';
import courseAPI from '../api/mockCourseAPI';
import {startAjaxCall} from './ajaxStatusAction';

export function createCourseSuccess(course){
    return {type: types.CREATE_COURSE_SUCCESS, course};
}
export function saveCourseSuccess(course){
    return {type: types.SAVE_COURSE_SUCCESS, course};
}
export function saveCourseFailure(err){
    return {type: types.SAVE_COURSE_FAILURE, err};
}
export function loadCoursesSuccess(courses){
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}
export function loadCoursesFailure(err){
    return { type: types.LOAD_COURSES_FAILURE, err};
}
export function updateCourseSuccess(course){
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}
/* this func is a thunk
   the thunk middleware takes this when called w/ dispatch and calest he function, then passes dispatch to the returned function
   rather than just passing the action as the argument like a vanilla dispatch(action) signature
  */
export function loadCourses() {
    return function(dispatch){
        dispatch(startAjaxCall());
        return courseAPI.getAllCourses()
            .then(courses =>{
               dispatch(loadCoursesSuccess(courses));
            }, err => {
                dispatch(loadCoursesFailure(err));
                return Promise.reject(err);
            });
    };
}

//getState exposes redux store state if you need some other state for ur logic
export function saveCourse(course, getState){
    return function(dispatch){
        dispatch(startAjaxCall());
        return courseAPI.saveCourse(course)
            .then(savedCourse => { // saved backend so save to redux
                course.id ?  dispatch(saveCourseSuccess(savedCourse)) :
                            dispatch(createCourseSuccess(savedCourse));
            }, err => {
                dispatch(saveCourseFailure(err));
                return Promise.reject(err);
            });
    };
}