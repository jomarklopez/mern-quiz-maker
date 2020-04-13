import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css';

const Modal = props => {
    const toggleModal = props.visibility ? "modal modal-active" : "modal";
    return ReactDOM.createPortal(
        <div className={toggleModal} onClick={props.onDismiss}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="header">
                    {props.title}
                </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div >,
        document.querySelector('#modal')
    );
};
export default Modal;