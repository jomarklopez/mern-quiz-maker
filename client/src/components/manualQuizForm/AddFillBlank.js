import React from 'react';
import { Field } from 'redux-form';

class AddFillBlank extends React.Component {

    renderOption({ input, placeholder, meta: { touched, error } }) {
        // const className = `ui field input ${error && touched ? 'error' : ''}`; For optional error handling
        return (
            <div className="field" >
                <input
                    {...input}
                    autoComplete="off"
                    placeholder={placeholder}
                />
            </div>
        )
    }

    render() {
        return (
            <>
                <label>Answer:</label>
                <Field
                    name={`0`}
                    component={this.renderOption.bind(this)}
                    placeholder="Answer"
                    optionNumber="0"
                />
            </>
        );
    }
}
export default AddFillBlank;