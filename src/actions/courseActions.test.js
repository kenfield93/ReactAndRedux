import expect from 'expect';
import thunk from 'redux-thunk';
//nock lets us mock http requests in node
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as courseActions from './courseActions';
import types from './actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Action', () => {
    afterEach(() => {
       nock.cleanAll(); //important to call cleanAll after each call w/ nock
    });

    /* Passing an arg (usually named done) and then calling it in the function lets mocha know
     * to wait for the function to end before declaring the test as pass/fail.
     * Can think of it as just a signal for mocha
     */
     it('should create START_AJAX_CALL & LOAD_COURSES_SUCCESS when loading coure', (done) => {
         /*Example of how to call nock
          Nock traps any HTTP calls from the code being tested and allows us to then send a mock response
                nock('http://example.com/')
                    .get('/courses')
                    .reply(200, { body: { course: [{id: 1, firstName:'Kyle, lastName:'Enfield'}]  }});
            */
         const expectedActions = [
             {type: types.BEGIN_AJAX_CALL},
             {type: types.LOAD_COURSES_SUCCESS, body: {courses:[{id:'clean-code', title: 'Clean Code'}] }}
         ];

         const store = mockStore({courses: []}, expectedActions);
         store.dispatch(courseActions.loadCourses()).then(() => {
             const actions = store.getActions();
             expect(actions[0].type).toEqual(types.START_AJAX_CALL);
             expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
             done();
         });
     });

});
