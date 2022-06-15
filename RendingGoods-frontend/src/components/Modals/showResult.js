import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ShowResult = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ми надіслали інформацію про ваше бажання орендувати послугу.
                    Очікуйте повідомлення
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default ShowResult;