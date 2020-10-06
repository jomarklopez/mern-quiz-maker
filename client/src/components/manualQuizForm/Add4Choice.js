import React from 'react';
import { Field } from 'redux-form';

class Add4Choice extends React.Component {

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
                                placeholder="Answer"
                                optionNumber="0"
                            />
                        </div>
                        <div className="eight wide column">
                            <Field
                                name={`1`}
                                component={this.renderOption.bind(this)}
                                placeholder="Option"
                                optionNumber="1"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <Field
                                name={`2`}
                                component={this.renderOption.bind(this)}
                                placeholder="Option"
                                optionNumber="2"
                            />
                        </div>
                        <div className="eight wide column">
                            <Field
                                name={`3`}
                                component={this.renderOption.bind(this)}
                                placeholder="Option"
                                optionNumber="3"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <Field
                                name={`4`}
                                component={this.renderOption.bind(this)}
                                placeholder="Option"
                                optionNumber="4"
                            />
                        </div>
                        <div className="eight wide column">
                            <Field
                                name={`5`}
                                component={this.renderOption.bind(this)}
                                placeholder="Option"
                                optionNumber="5"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Add4Choice;