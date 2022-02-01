import React from 'react';
import {useSelector} from "react-redux";
import LogInForm from "../../features/LogInForm";

const ModalManager = props => {
    const modalLookUp = {
        LogInForm
    }; // empty modal
    const currentModal = useSelector(state => state.modals); // getting the currentModal.
    let renderedModal; // renderedModal is empty for now.
    if (currentModal) {
        const {modalType, modalProps} = currentModal; // destructring properties.
        const ModalComponent = modalLookUp[modalType]; // based on the ModalComponent pass all the ModalType.
        renderedModal = <ModalComponent {...modalProps}/>

    }

    return (
        <span>{renderedModal}</span>
    );
};

export default ModalManager;