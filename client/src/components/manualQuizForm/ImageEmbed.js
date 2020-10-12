import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import '../../styles/imageembed.css'

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const renderFieldInput = ({ input, label, type , setPreviewState}) => {
    return <input {...input}
        type={type}
        placeholder={label}
        autoComplete="off"
        onChange={(e) => {
            input.onChange(e.target.value)
            setPreviewState(false)
        }}
    />
}

const renderImage = (imageLink, previewState) => {

    if (imageLink !== undefined && previewState === true) {
        return (
            <img
                className="questionimg"
                src={imageLink}
                alt="question-img"
                onError={() => alert('Image link is broken :(')}
            />
        )
    }
    
}

const renderField = (hasField, imageLink, setPreviewState) => {

    if (hasField) {
        return (
            <>
                <button onClick={() => {
                    if (imageLink !== undefined) {
                        setPreviewState(true)
                    }
                }}> Preview </button>
                <Field
                    name={`question-img`}
                    component={renderFieldInput}
                    label="Image Link"
                    validate={[required]}
                    setPreviewState={setPreviewState}
                />
            </>
        )
    }
}

const ImageEmbed = (props) => {
    const [previewState, setPreviewState] = useState(false)
    return (
        <div className="imageembed-container">
            <label>Add image: </label>
            {renderField(props.hasField, props.imageLink,setPreviewState)}
            {renderImage(props.imageLink, previewState, setPreviewState)}
        </div>
    )
}

const selector = formValueSelector('manualQuizForm') // <-- same as form name

const mapStateToProps = (state, ownProps) => {
    const imageLink = selector(state, `${ownProps.itemNumber}.question-img`)
    return { imageLink };
};

export default connect(mapStateToProps)(ImageEmbed);

