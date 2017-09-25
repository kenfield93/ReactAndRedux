/**
 * Created by kyle on 9/21/17.
 */
import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) =>{
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                { /*Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html#the-select-tag */}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control">
                    <option value="">{defaultOption}</option>
                    {options.map(op => {
                        return <option key={op.value} value={op.value}>{op.text}</option>;
                    })
                    }
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;