import React, {useContext} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";

const AddImg = ({show,onHide}) => {
    const {user} = useContext(Context)
    const selectFile = e => {
        user.user.filter(users=>{
            if(users.name === user.currUser.name){
                users.img = e.target.files[0].name
            }
        })
        console.log(user.currUser)

    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Встановити нове зображення
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={selectFile}
                        className='mt-3'
                        type="file"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={onHide} >Зберегти</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddImg;