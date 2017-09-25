/**
 * Created by kyle on 9/21/17.
 */
import types from '../actions/actionTypes';
import initState from './initialState';

export default function authorReducer(state = initState.authors, action){
    switch(action.type){
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;
    }
}