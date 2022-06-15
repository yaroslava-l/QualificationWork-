import React from 'react';
import {Modal} from "react-bootstrap";

const ShowFailName = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    За цим нікнеймом вже створенний акаунт.
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default ShowFailName;