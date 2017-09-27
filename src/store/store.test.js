/**
 * Created by kyle on 9/26/17.
 */
import expect from 'expect';
import {createStore} from 'redux';
//automatically gets index file if no file is specified
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Testing Store', () => {
    it('Should handle creating courses', () => {
        //init env
        const store = createStore(rootReducer, initialState);
        const course1 = {
            id: 1, title: 'Clean Code'
        };
        const course2 = {
            id: 2, title: 'Testing test'
        };

        // act
        let action = courseActions.createCourseSuccess(course1);
        store.dispatch(action);
        action = courseActions.createCourseSuccess(course2);
        store.dispatch(action);

        //assert
        let actual = store.getState().courses.splice(0,2);
        let expected = [
            {id: 1, title: 'Clean Code'},
            {id: 2, title: 'Testing test'}
        ];
        expect(actual).toEqual(expected);

        //act
        course1.title = 'Some video';
        action = courseActions.updateCourseSuccess(course1);
        store.dispatch(action);

        //assert
        actual = store.getState().courses.find(e => e.id === 1);
        expected = {id: 1, title: 'Some video'};

        expect(actual).toEqual(expected);
    })
});