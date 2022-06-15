import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {getCookie, sendData, sendDataAuth} from "../../../http";

const CreateServices = ({show,onHide}) => {
    const {goods} = useContext(Context)
    const {user}= useContext(Context)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [newCat, setNewCat] = useState({name:''})
    function addNewCat(){
        const newUCat={
            ...newCat

        }
        sendDataAuth(`http://localhost:8080/createGoodsCategory`, newUCat,base64data)
            .then(()=>{
            })
        onHide()
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
                    Додати категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={newCat.name}
                        onChange={e=>setNewCat({...newCat, name: e.target.value})}
                        placeholder={"Введіть назву категорії"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={addNewCat}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateServices;