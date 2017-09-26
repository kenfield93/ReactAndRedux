import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

function setUp(isSaving){
    const props = {
        course: {}, isSaving: isSaving, errors: {},
        onSave: () => {},
        onChange: () => {}
    };
    return shallow(<CourseForm {...props} />);
}

describe('CourseForm tests via Enzyme', () => {
    it('renders form and h1', () => {
        const wrapper = setUp(false);
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Manage Course');
    });

    it('save button is labeled "Save" when NOT saving', () =>{
        const wrapper = setUp(false);
        //props is like html element property, not related to React props
        expect(wrapper.find('input').props().value).toBe('Save');
    });

    it('save Button is labeled "Saving... when saving', () => {
       const wrapper = setUp(true);
        expect(wrapper.find('input').props().value).toBe('Saving...');
    }) ;
});