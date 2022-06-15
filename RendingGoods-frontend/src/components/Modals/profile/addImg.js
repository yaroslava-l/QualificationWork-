import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {getCookie, getResourceAuth, sendDataAuth} from "../../../http";
import {useHistory} from 'react-router-dom'
import {GOODS_ROUTE, PROFILE_ROUTE} from "../../../utils/consts";

const AddImg = ({show,onHide,editData}) => {
    const {user} = useContext(Context)
    const history = useHistory()
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [newGoods, setNewGoods] = useState({img:""})
    const [newUserChar, setNewUserChar] = useState({
        id:user.currUser.id,
        name:user.currUser.name,
        email:user.currUser.email,
        phone: +user.currUser.phone,
        surname:user.currUser.surname,
        male:user.currUser.male,
        yearsOld: +user.currUser.yearsOld,
        blocked:false
    })
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
    }
    function addNewGoodsFunc()   {
        const newUGoods={
            ...newGoods, ...newUserChar

        }
        sendDataAuth(`http://localhost:8080/editUserSettings`, newUGoods,base64data)
            .then(()=>{
                console.log(newUGoods)
            }).catch((err)=>{
            console.log(err)
        })
        getResourceAuth('http://localhost:8080/users',base64data
        ).then(data =>
            user.setUser(data)
        )
        setNewGoods({img:""})
        editData()
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
                <Button variant={'outline-success'} onClick={addNewGoodsFunc} >Зберегти</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddImg;