import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";

const CreateServices = ({show,onHide}) => {
    const {goods} = useContext(Context)
    const [newCat, setNewCat] = useState({name:''})
    function addNewCat()   {
        const newUCat={
            ...newCat, id: Date.now()

        }
        goods.goods.push(newUCat)
        console.log(newUCat)
        setNewCat({name:'',img:"",description:"",cost:"",countCheck:0})
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