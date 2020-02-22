import React from 'react';
import { Field } from 'redux-form';

class AddOptions extends React.Component {

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
                <label>Options:</label>
                <div className="ui internally celled grid">
                    <div className="row">
                        <div className="eight wide column">
                            <Field
                                name={`0`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter the question's answer here."
                                optionNumber="0"
                            />
                        </div>
                        <div className="eight wide column">
                            <Field
                                name={`1`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter an option."
                                optionNumber="1"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <Field
                                name={`2`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter an option."
                                optionNumber="2"
                            />
                        </div>
                        <div className="eight wide column">
                            <Field
                                name={`3`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter an option."
                                optionNumber="3"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default AddOptions;