/**
 * Created by kyle on 9/21/17.
 */
import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthors, isSaving, onSave, onChange, errors}) => {

    return(
        <form>
            <h1>Manage Course</h1>
            <TextInput
                name="title"
                label="Title"
                value={course.title}
                onChange={onChange}
                error={errors.title}
            />

            <SelectInput
                name="authorId"
                label="Author"
                value={course.author}
                defaultOption="Select Author"
                options={allAuthors}
                onChange={onChange} errors={errors.authorId}
            />

            <TextInput
                name="category"
                label="Category"
                value={course.category}
                onChange={onChange}
                error={errors.category}
            />


            <TextInput
                name="length"
                label="Length"
                value={course.length}
                onChange={onChange}
                error={errors.length}
            />

            <input
                type="submit"
                disabled={isSaving}
                value={isSaving ? "Saving..." : "Save"}
                className="btn btn-primary"
                onClick={onSave}
            />
        </form>
    );
};

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    allAuthors: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    errors: PropTypes.object
};

export default CourseForm;