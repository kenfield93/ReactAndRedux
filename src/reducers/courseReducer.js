import types from '../actions/actionTypes';
import initState from './initialState';

/* i think technically we would want state = initState but since each reducer
   is only dealing w/ one set of state data I don't think it neccessary to include entire initState object (unless corresponding actions are using all of state)
 */
//TODO sort by entire title, not just first letters.
function defaultAction(a){ return a;}
export default function courseReducer(state = initState.courses, action){
    let newState = state;
    //need this so we dont modify every state we see by coping it and cause react-redux's shallow copy test to fail
    let stateWasHandledByThisCourseReducer = {status: true};
    const courseNameComparator = (a, b) =>{  return a.title[0] < b.title[0] ? -1 : 1;};
    if(stateWasHandledByThisCourseReducer.status) {
        newState = Object.assign([], callReducers(state, action, stateWasHandledByThisCourseReducer));
        newState.sort(courseNameComparator);
    }
    return newState;
}

function callReducers(state, action, stateWasHandledByThisCourseReducer){
    let newState;

    switch(action.type){
        case types.CREATE_COURSE_SUCCESS:
            return state.concat(Object.assign({}, action.course));
        //return [...state, Object.assign({}, action.course)];
        case types.UPDATE_COURSE_SUCCESS:
            return state.filter(c => action.course.id !== c.id).concat(Object.assign({}, action.course));
        case types.LOAD_COURSES_SUCCESS:
            return Object.assign([],action.courses);
        // assumes no duplicates as it would delete them
        case types.SAVE_COURSE_SUCCESS:
            newState = state.filter(c => action.course.id !== c.id).concat(Object.assign({}, action.course));
            return newState;
        default:
            stateWasHandledByThisCourseReducer.status = false;
            return defaultAction(state);
    }
}