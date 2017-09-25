/**
 * Created by kyle on 9/18/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CoursesPage from './CoursesPage';
import * as courseActions from '../../actions/courseActions';
import {browserHistory} from 'react-router';

//NOTE: there is extra stuff that can be refactored out (adding courses used to not be here
// Im keeping it as an example, there are helpful notes on react-redux at the bottom

class CoursesManager extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            course: {title: ""}
        };

        this.addCourseRedirect = this.addCourseRedirect.bind(this);
    }

    //TODO consider changing courses in reducers/initalState to null, to differentiate between not there and just having 0 courses
    componentWillMount(){
        console.log("onCOmponentWillMount");
        console.log(this.props);
        if(!this.props.courses || this.props.courses.length == 0) {
            console.log("fuck me mate");
            this.props.actions.loadCourses();
        }
    }
    addCourseRedirect(){
        browserHistory.push('/course');
    }


    render(){
        return(
            <div>
                <hr/>
                <CoursesPage courses={this.props.courses}
                    addCourseRedirect={this.addCourseRedirect}
                />
            </div>
        );
    }
}

CoursesManager.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};
//https://www.youtube.com/watch?v=VJ38wSFbM3A
/*
 state: represents state inside redux store
 ownProps: props of this component (things passed down to it, like router related props).
    I think so we can use current CourseManager's this.props even though this func isn't part of it
 */
function mapStateToProps(state, ownProps){
    // returns list of props we want to be exposed on our component
    // for state.courses, 'courses' is the name defined inside rootreducer in /reducers/index.js

    return({
        courses: state.courses
    });
}
/* deciding what actions you want to expose on your component. Lets us bind actions(which modify redux) to event from the react component
*  if this func isn't passed to connect its automatically attatches dispatch to components props to fire off actions
* */
// takes a second ownProps argument but should be avoided if its something that is likely to change, otherwise will potentially be rerendered often
function mapDispatchToProps(dispatch, ownProps){
 /*
    if(!ownProps.courses)
         dispatch(courseActions.loadCourses());
         */
    const createCourse = course => dispatch(courseActions.createCourseSuccess(course));
    const loadCourses = () => dispatch(courseActions.loadCourses());
    return {
        actions: {
            createCourse,
            loadCourses
        }
    };

    /*Benefit of this way is that it binds all your actions in one line. (hiding them behind action can like above)
      Negative is that we have to go to the courseAction file to see the different actions available
   return{
       actions: bindActionCreators(courseActions, dispatch)
   };
   */
}
// connect wraps CourseManager using these 2 functoins. It subscribes to redux store and re-renders when state changes
export default connect(mapStateToProps, mapDispatchToProps)(CoursesManager);