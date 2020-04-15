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
                    <div class="header">
                        <span>{error}</span>
                    </div>

                    <div class="closeButton" onClick={handleClose}>
                        <i class="close icon"></i>
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