/**
 * Created by kyle on 9/23/17.
 */
import initialState from './initialState';
import types from '../actions/actionTypes';

function actionTypeEndsInSuccess(type){
    return type.substring(type.length - 8) == '_SUCCESS';
}
function actionTypeEndsInFailure(type){
    return type.substring(type.length - 8) == '_FAILURE';
}
export default function ajaxStatusReducer(state=initialState.numAjaxCallsInProgress, action){
    if(action.type == types.START_AJAX_CALL ){
        return state + 1;
    }
    else if( actionTypeEndsInSuccess(action.type) ||  actionTypeEndsInFailure(action.type) ){
        return state - 1;
    }
    return state;
}