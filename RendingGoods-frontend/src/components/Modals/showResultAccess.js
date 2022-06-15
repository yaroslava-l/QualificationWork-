import React from 'react';
import {Modal} from "react-bootstrap";

const ShowResultAccess = ({show,onHide, status}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                {status ?
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ми надіслали інформацію, що ви згодні на оренду послуги.
                    </Modal.Title>
                    :
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ми надіслали інформацію, що ви не згодні на оренду послуги.
                    </Modal.Title>
                }

            </Modal.Header>
        </Modal>
    );
};

export default ShowResultAccess;