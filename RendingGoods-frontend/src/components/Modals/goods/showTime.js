import React, {useContext, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {getCookie, sendDataAuth} from "../../../http";

const ShowTime = observer(({good,show,onHide,hideOnClick}) => {
    let body = [1,2,3,4,5,6,7,8,9,10,11,12]
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    const [time, setTime] = useState(0)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)

    const [buyGoods, setBuyGoods] = useState({buyerUserId:"",sellUserId:"",goodsItemId:"",requestStatus:false, months:0})
    let today = new Date()
    function buyGood(){
        buyGoods.buyerUserId = user.currUser.id
        buyGoods.sellUserId = goods.currGoods.creatorId
        buyGoods.goodsItemId = goods.currGoods.id
        buyGoods.months = today.getMonth() + time + 1
        sendDataAuth(`http://localhost:8080/buy`, buyGoods,base64data)
            .then(()=>{
                console.log(buyGoods)
            }).catch((err)=>{
            console.log(err)
        })
        setBuyGoods({buyerUserId:"",sellUserId:"",goodsItemId:"",requestStatus:false, months:0})
        onHide()
        hideOnClick()
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
                    Оберіть к-сть місяців, на яку ви хочете орендувати послугу.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>{time ? time : "К-сть місяців"} </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {body.map(bodys=>
                            <Dropdown.Item
                                onClick={()=>{
                                    setTime(bodys)
                                }
                                }
                                key={bodys}
                            >
                                {bodys}
                            </Dropdown.Item>
                        )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <div>
                    {good.cost*time} грн
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={
                    buyGood
                }>Орендувати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ShowTime;