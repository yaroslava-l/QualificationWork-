import React from 'react';
import {Modal} from "react-bootstrap";

const ShowFailDelete = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Неможливо видалити цю категорію, оскільки є товари в цій категорії.
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default ShowFailDelete;