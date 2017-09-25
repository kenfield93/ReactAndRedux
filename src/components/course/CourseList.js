/**
 * Created by kyle on 9/20/17.
 */
import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

// {courses} is destructuring courses from props.courses
const CourseList = ({courses}) => {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                </tr>
            </thead>
            <tbody>
            {courses.map((course) =>{
                return <CourseListRow key={course.id} course={course} />;}
            )}
            </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;