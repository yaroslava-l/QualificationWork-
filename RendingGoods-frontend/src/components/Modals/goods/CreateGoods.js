import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {getCookie, getResourceAuth, sendData, sendDataAuth} from "../../../http";
import {useHistory} from 'react-router-dom'
import {GOODS_ROUTE} from "../../../utils/consts";

const CreateGoods = observer(({show,onHide}) => {
    const history = useHistory()
    const {goods} = useContext(Context)
    const {user}= useContext(Context)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [newGoods, setNewGoods] = useState({name:'',img:"",description:"",cost:"",views:0,bought:false,months:0,blocked:false,rating:0})
    async function image_to_base64(file){
        let result_base64 = await new Promise((resolve)=>{
            let fileReader = new FileReader()
            fileReader.onload = (e) => resolve(fileReader.result)
            fileReader.onerror=(error)=>{
                console.log(error)
            }
            fileReader.readAsDataURL(file)
        })
        return result_base64
    }
    async function selectFile(e){
        newGoods.img = await image_to_base64(e.target.files[0])
        console.log(newGoods.img)
    }

    function addNewGoodsFunc()   {
        const newUGoods={
            ...newGoods, categoryId: goods.selectedServices.id,creatorId:user.currUser.id

        }
        sendDataAuth(`http://localhost:8080/createGoodsItem`, newUGoods,base64data)
            .then(()=>{
                console.log(newUGoods)
            }).catch((err)=>{
            console.log(err)
        })
            getResourceAuth('http://localhost:8080/goods',base64data
            ).then(data =>
                goods.setGoodsItem(data)
            )
        setNewGoods({name:'',img:"",description:"",cost:"",views:0,bought:false,months:0,blocked:false,rating:0})
        onHide()
        history.push(GOODS_ROUTE)

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