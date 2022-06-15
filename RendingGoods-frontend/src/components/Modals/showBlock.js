import React from 'react';
import {Modal} from "react-bootstrap";

const ShowBlock = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ви були заблоковані на цьому сайті. Ви можете і далі переглядати товар.
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default ShowBlock;