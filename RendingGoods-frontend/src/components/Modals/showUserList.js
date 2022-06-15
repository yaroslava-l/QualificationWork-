import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import UserListItem from "../userListItem";
import GoodsItem from "../GoodsItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ShowUserList = observer(({show,onHide}) => {
    const {user} = useContext(Context)
    const [searchCheck,setSearchCheck]=useState("")
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="400"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Список користувачів
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Row className="d-flex">
                   <Form.Control
                       className='mt-3'
                       placeholder="Пошук"
                       onChange={e=>{
                           setSearchCheck(e.target.value)
                       }}
                   />
                   {
                       user.user.filter(users=>{
                           if(searchCheck === ""){
                               return users
                           }
                           else{
                               if(users.name.startsWith(searchCheck)){
                                   return users
                               }
                           }
                       }).map(users=>
                       <UserListItem className="mb-lg-2" key={users.id} users={users}/>
                   )

                   }
               </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ShowUserList;