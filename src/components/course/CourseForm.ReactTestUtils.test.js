import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setUp(isSaving){
    let props = {
        course:  {}, isSaving: isSaving, errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props}/>);
    let output = renderer.getRenderOutput();

    return{
        props,
        output,
        renderer
    };
}
describe( 'CourseForm test via React-TestUtil', () => {
    it('renders form and h1', () => {
        const setUpInfo = setUp();
        const renderedComponent = setUpInfo.output;
        expect(renderedComponent.type).toBe('form');
        let [ h1 ] = renderedComponent.props.children;
      // equivalent to  let h1 = renderedComponent.props.children[0];
        expect(h1.type).toBe('h1');
    });

    it('save button is labled "Save" when NOT currently saving', () => {
        let isSaving = false  ;
        const setUpInfo = setUp(isSaving);
        const renderedComponent = setUpInfo.output;
        const submitButton = renderedComponent.props.children[5];
        expect(submitButton.props.value).toBe('Save');
    });

    it('save button is labled "Saving..." when currently saving', () => {
        let isSaving = true  ;
        const setUpInfo = setUp(isSaving);
        const renderedComponent = setUpInfo.output;
        const submitButton = renderedComponent.props.children[5];
        expect(submitButton.props.value).toBe('Saving...');
    });
});