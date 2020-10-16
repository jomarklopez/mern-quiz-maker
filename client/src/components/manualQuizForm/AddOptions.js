import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import MultipleChoice from './MultipleChoice';
import '../../styles/quizCreate.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return <input {...input}
        placeholder={label}
        autoComplete="off"
    />
}

const renderOptions = (type) => {
    switch (type) {
        case 'multiplechoice':
            return <MultipleChoice/>
        case 'patternmatch':
            return <Field
                name={`options[0].option`}
                component={renderField}
                label="Answer:"
                validate={[required]}
            />
        default:
            return <Field name="optionType" component={renderSelect} label="dropDownSelect" >
                <option label="Multiple Choice" value="multiplechoice"></option>
                <option label="Pattern Match" value="patternmatch"></option>
            </Field>
    }
}

const renderLabel = (type) => {
    switch (type) {
        case 'multiplechoice':
            return <label>Options:</label>
        case 'patternmatch':
            return <label>Answer:</label>
        default:
            return <></>
    }
}

const renderSelect = ({ input, children }) => {
    return (
        <select className="optionType-select" {...input} onChange={(e) => {
            input.onChange(e.target.value)
        }} value={input.value}>
            <option value="">Option Type</option>
            {children.map(({ props }, index) => <option key={index} value={props.value} >{props.label}</option> )}
        </select>
    )
}
 
const AddOptions = (props) => {
    return (
        <div className="options-wrapper">
            {renderLabel(props.optionType)}
            {renderOptions(props.optionType)}  
        </div>
    )
}

// Decorate with connect to read form values
const selector = formValueSelector('manualQuizForm') // <-- same as form name

const mapStateToProps = (state, ownProps) => {
    const optionType = selector(state, `${ownProps.itemNumber}.optionType`)
    return { optionType };
};

export default connect(mapStateToProps)(AddOptions);