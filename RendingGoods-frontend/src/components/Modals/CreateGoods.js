import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateGoods = observer(({show,onHide}) => {
    const {goods} = useContext(Context)
    const {user}= useContext(Context)

    const [newGoods, setNewGoods] = useState({name:'',img:"",description:"",cost:"",countCheck:0,status:false,month:0,blockStatus:false,rating:0})
    const selectFile = e => {
        newGoods.img = e.target.files[0].name
    }
    function addNewGoodsFunc()   {
        const newUGoods={
            ...newGoods, id: goods.goodsItem.length+1, goods: goods.selectedServices.name,userName:user.currUser.name

        }
        goods.setGoodsItem(newUGoods)
        console.log(newUGoods)
        setNewGoods({name:'',img:"",description:"",cost:"",countCheck:0,status:false,month:0,blockStatus:false,rating:0})
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
                    Створення оголошення
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={newGoods.name}
                        onChange={e=>setNewGoods({...newGoods, name: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть назву"}
                    />
                    <Form.Control
                        value={newGoods.cost}
                        onChange={e=>setNewGoods({...newGoods, cost: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть ціну"}
                    />
                    <Form.Control
                        value={newGoods.description}
                        onChange={e=>setNewGoods({...newGoods, description: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть опис"}
                    />
                    <Form.Control
                        onChange={selectFile}
                        className='mt-3'
                        type="file"
                    />
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle> {goods.selectedServices.name || "Виберіть категорію"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {goods.goods.map(type=>
                                <Dropdown.Item
                                    onClick={()=>goods.setSelectedServices(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={
                    addNewGoodsFunc
                }>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateGoods;