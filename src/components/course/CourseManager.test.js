/**
 * Created by kyle on 9/26/17.
 */
/*
 2 main ways of testing container components wrapped in
  react-redux's 'connect' function.
 1:
   Warp in <Provider /> tag. <Provider store={store}>MyComponent</Provider>
   this allows you to pass your own custom store. good for testing redux related parts
 2:
    add named export to unconnected component. Good for just testing the normal react parts
     like local state/props and their display or interaction w/ children
 */

import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {CourseManager as UnConnectedCourseManager} from './CourseManager';

const mockProps = {
    authors: [],
    course: {id:'', watchHref: '', title: '', authorId: '', category: '', length: ''},
    actions: { saveCourse: () => { return Promise.resolve();}}
};

describe( 'Test Manage Course Page', ()=>{
   it('sets error message when trying to save empty title', () => {
       //use mount to test child commonents
       //since this isn't connected we don't have mapState or mapDispatch to props functions
       // so we may have to manually pass props to the component
       const wrapper = mount(<UnConnectedCourseManager {...mockProps} />);
       const saveButton = wrapper.find('input').last();
       expect(saveButton.prop('type')).toBe('submit');
       saveButton.simulate('click');
       expect(wrapper.state().errors.title).toBe('Title must be at least 4 characters');
   });
});

// for testing mapStateToProps, anything worth testing is probably worth putting as a selector, so just test the selector directly

/* unit testing Actions is kinda dumb since it just sets type and content.
   makes more sense to testing the asynch wrappers ( thunks or promises or  generators).
   Overall integration testing should cover them
*/