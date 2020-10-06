import React from 'react';
import { connect } from 'react-redux';

import '../styles/errornotification.css';

const ErrorNotification = ({ errorState, dispatch }) => {

    const error = errorState.error;
    const isOpen = errorState.isOpen;

    function handleClose() {
        dispatch({ type: 'HIDE_ERROR' })
    }

    return (
        <>
            {isOpen && error && (
                <div className="error_container">
                    <div className="header">
                        <span>{error}</span>
                    </div>

                    <div className="closeButton" onClick={handleClose}>
                        <i className="close icon"></i>
                    </div>
                </div>
            )}
        </>
    )
}

function mapStateToProps(state) {
    return { errorState: state.error }
}
export default connect(mapStateToProps)(ErrorNotification);