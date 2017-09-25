/**
 * Created by kyle on 9/21/17.
 */
import types from './actionTypes';
import authorAPI from '../api/mockAuthorAPI';
import {startAjaxCall} from './ajaxStatusAction';

export function loadAuthorsSuccess(authors){
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}
export function loadAuthorsError(err){
    return { type: types.LOAD_AUTHORS_FAILURE, err};
}

export function loadAuthors(){
    return function(dispatch){
        dispatch(startAjaxCall());
        return authorAPI.getAllAuthors()
            .then(authors =>{
                dispatch(loadAuthorsSuccess(authors));
            }, err => { throw(err);
        });
    };
}
