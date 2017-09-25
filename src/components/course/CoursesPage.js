/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from 'react';
import CourseList from './CourseList';


const CoursesPage = (props) => {
    return(
      <div>
          <h2> Courses </h2>
          <input type="submit"
                 value="Add Course"
                 className="btn btn-primary"
                 onClick={props.addCourseRedirect}
          />
          <CourseList courses={props.courses} />
      </div>
    );
};

CoursesPage.propTypes = {
    addCourseRedirect: PropTypes.func.isRequired,
    courses: PropTypes.array
};
export default CoursesPage;