/**
 * Created by kyle on 9/21/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from '../course/CourseForm';
import * as authorActions from '../../actions/authorActions';
import toastr from 'toastr';

export class CourseManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            isSaving: false

        };
        this.onSaveCourse = this.onSaveCourse.bind(this);
        this.onCourseFieldChange = this.onCourseFieldChange.bind(this);
    }

    //TODO get it to refresh and repopulate course page. I think courses aren't being loaded, probably cause I didn't
    // load them all at the entry point of the program. being loaded in CoursesManager so probably not updating on refresh

    //react calls this when props change and sometimes when it thinks props have changed
    // that why we do the first check, to ensure the props have changed before changing state and rerendering
    // we need this because construtor is basically called once (again on things like refresh)
    // it isn't called everytime render is called (aka props or state changing) so we need to modify props/state here
    componentWillReceiveProps(nextProps){
        if( this.props.course.id != nextProps.course.id){
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    //front end validation. we also have backend where toastr prints that corresponding error message
    //Note: i have the backend and front end verification a little different to show different messages
    isCourseFormInputValid(){
        let isValid = true;
        let errors = {};
        if( !this.state.course.title || this.state.course.title.length < 4 ){
            errors.title = "Title must be at least 4 characters";
            isValid = false;
        }

        if(!isValid)
            this.setState({errors});

        return isValid;
    }
    onSaveCourse(event){
        event.preventDefault();

        if(! this.isCourseFormInputValid())
            return;

        this.setState({isSaving: true});
        this.props.actions.saveCourse(this.state.course)
            .then((result)=>{
                this.setState({isSaving: false});
                toastr.success('Course Saved');
                this.redirect();
            }).catch(err => {
                //failure action dispatched automatically but can add aditinal failure handeling here
                toastr.error(`Course Failed To Save: ${err}`);
                this.setState({isSaving:false});
        });

    }
    redirect(){
        this.context.router.push('/courses');
    }
    /* onyl really needed if u wanna do some action as they type, if you just want the data when they submit
       you should not set input value in CourseForm
     */
    onCourseFieldChange(event){
        const field = event.target.name;
        const value = event.target.value;
        const o = {};
        Object.assign(o, this.state.course);
        o[field] = value;
        this.setState({course: o});
    }

    restructureAuthorDataForSelectInput(a){
        return {
            value: a.id,
            text:  a.firstName + " " + a.lastName
        };
    }
    render(){
        return(
              <CourseForm course={this.state.course}
                          errors={this.state.errors}
                          allAuthors={this.props.authors ? this.props.authors.map(
                                        a => this.restructureAuthorDataForSelectInput(a)) : []}
                          onSave={this.onSaveCourse}
                          isSaving={this.state.isSaving}
                          onChange={this.onCourseFieldChange}
              />
        );
    }
}

//access routers context, rather than use browsingHistory. not sure if this is a good idea for production
// exposes router on this.context
CourseManager.contextTypes = {
    router: PropTypes.object
};

CourseManager.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired

};

// Redux store isn't persistant on refresh(probably other actions too) so thats why the first time
// courses is already is redux state but on refresh it isn't
// probably need some logic in mapDispatchToProps for if something isn't in the store you're expecting, to load it
// look into selectors or modifying reducers
function mapStateToProps(state, ownProps){

    let course = {id:'', watchHref: ' ', title: '', authorId: ' ', category: ' ', length: ' '};
    const courseId = ownProps.params.id;
    //generally probably not a good idea to set state from props, but proably fine if its something from redux put onto
    // props in mapStateToProps
    if(courseId && state.courses.length > 0){
        let courseTmp = getCourseById(state.courses, courseId);
        course = courseTmp ? courseTmp : course;
    }

    return{
        course,
        authors: state.authors
    };
}
//TODO bind and call loadCourses in react class ( probably componentWillMount) like in CoursesManager
function mapDispatchToProps(dispatch, ownProps){


    if(!ownProps.courses || ownProps.courses.length < 1)
        dispatch(courseActions.loadCourses());
    dispatch(authorActions.loadAuthors());
    const saveCourse = (course) =>  dispatch(courseActions.saveCourse(course));
    return{
        actions: {
            saveCourse
        }
    };
}

function getCourseById(courses, id){
    const validCourses = courses.filter(c => c.id === id);
    if(validCourses.length) return validCourses.pop();
    return null;
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseManager);