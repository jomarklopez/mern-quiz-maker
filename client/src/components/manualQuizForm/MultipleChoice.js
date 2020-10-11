import React from 'react';
import { Field, FieldArray } from 'redux-form';

import '../../styles/quizCreate.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const renderCheckbox = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <label className="ui checkbox-container">
            <input {...input} placeholder={label} type={type} checked={input.checked} />
            <span className="checkmark"><i className={`check icon`}></i></span>
        </label>
    );
}

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return <input {...input}
        type={type}
        placeholder={label}
        autoComplete="off"
    />
}

const renderOptionList = ({ fields, meta: { touched, error, submitFailed } }) => {
    return <ul id="multiplechoice-list">
        {fields.map((option, index) =>
            <li id="option-container" key={index}>
                <Field
                    name={`${option}.answer`}
                    component={renderCheckbox}
                    type="checkbox"
                />
                <Field
                    name={`${option}.option`}
                    component={renderField}
                    label="Option"
                    validate={[required]}
                />
                <button
                    type="button"
                    className="ui right attached icon button"
                    onClick={() => {
                        fields.remove(index)
                    }}
                >
                    <i className="trash icon"></i>
                </button>
            </li>
        )}
        <li>
            <button
                type="button"
                className="ui blue basic button"
                id="addOption-btn"
            onClick={() => fields.push({})}
            >Add Option
                </button>
        </li>
    </ul>
}

const MultipleChoice = () => {
    return <FieldArray name={`options`} component={renderOptionList} />
}

export default MultipleChoice;

