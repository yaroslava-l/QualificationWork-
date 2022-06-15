import React from 'react';
import {Modal} from "react-bootstrap";

const ShowFail = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ви ввели невірний пароль або нікнейм.
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default ShowFail;