/**
 * Created by kyle on 9/26/17.
 */
import expect from 'expect';
import courseReducer from './courseReducer';
import * as courseActions from '../actions/courseActions';

describe('Testing Course Reducer:', () =>{
    it('should add course when passed CREATE_COURSE_SUCCESS', () =>{
        //init testing env
        const startState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};
        const action = courseActions.createCourseSuccess(newCourse);

        //do action
        const newState = courseReducer(startState, action);

        //assert
        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('A');
        expect(newState[2].title).toEqual('C');
        expect(startState).toNotEqual(newState);


    });
    it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
        //init testing env
        const startState = [
            {id: 1, title: 'A'},
            {id: 'B', title: 'B'},
            {id: 'C', title: 'C'}
        ];
        let course = {id: 'B', title: 'B'};
        let action = courseActions.updateCourseSuccess(course);

        //do action
        let newState = courseReducer(startState, action);
        let updatedCourse = newState.find(e => e.id == 'B');

        //assert
        expect(newState.length).toEqual(3);

        expect(newState[0].title).toEqual('A');
        expect(updatedCourse.title).toEqual('B');
        //since nothing was updated, the same state is passed throw. if newState isShallowEqual to oldState then no update
        expect(startState).toEqual(newState);


        //new env
        course = {id: 'B', title: 'BBB'};
        action = courseActions.updateCourseSuccess(course);

        // do action
        newState = courseReducer(startState, action);
        updatedCourse = newState.find(e => e.id == 'B');
        const notUpdatedCourse = newState.find(e => e.id == 1);

        //assert

        expect(newState.length).toEqual(3);
        expect(notUpdatedCourse.title).toEqual('A');
        expect(updatedCourse.title).toEqual('BBB');
        expect(startState).toNotEqual(newState);

        
    })
});