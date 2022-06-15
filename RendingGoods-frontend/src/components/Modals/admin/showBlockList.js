import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {getCookie, sendDataAuth, sendDeleteDataAuth} from "../../../http";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import ShowFailDelete from "../showFailDelete";

const ShowBlockList = observer(({onHide,show,hideOnClick}) => {
    const {goods} = useContext(Context)
    const {user}= useContext(Context)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [deleteVis, setDeleteVis] = useState(false)
    let block = false
    function deleteCategory(){
        let data = {
            id:goods.selectedBlockCategory.id
        }
        goods.goodsItem.filter(good=>{
            if(good.categoryId === goods.selectedBlockCategory.id){
                block = true
            }
        })
        if(block){
            hideOnClick()
        }
            sendDeleteDataAuth('http://localhost:8080/deleteGoodsCategory',data,base64data).then(()=>{
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
                    Видалити категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle> {goods.selectedBlockCategory.name || "Виберіть категорію"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {goods.goods.map(type=>
                            <Dropdown.Item
                                onClick={()=>{

                                    goods.setSelectedBlockCategory(type)
                                    console.log(goods.selectedBlockCategory)
                                }}
                                key={type.id}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={deleteCategory}>Видалити</Button>
            </Modal.Footer>
            <ShowFailDelete show={deleteVis} onHide={()=>setDeleteVis(false)}/>
        </Modal>
    );
});

export default ShowBlockList;