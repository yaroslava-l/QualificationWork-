import React, {useContext, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ShowTime = observer(({good,show,onHide,hideOnClick}) => {
    let body = [1,2,3,4,5,6,7,8,9,10,11,12]
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    const [time, setTime] = useState(0)
    const [buyGoods, setBuyGoods] = useState({buyerUserName:"",sellUserName:"",id:"",nameGoodsItem:"",status:false, month:""})
    let today = new Date()
    function buyGood(){
        buyGoods.buyerUserName = user.currUser.name
        buyGoods.sellUserName = goods.currGoods.userName
        buyGoods.id = goods.currGoods.id
        buyGoods.nameGoodsItem = goods.currGoods.name
        buyGoods.month = today.getMonth() + time + 1
        goods.goodsItem[good.id - 1].month = today.getMonth() + time + 1
        user.user.filter(users=>{
            if(buyGoods.sellUserName === users.name){
                users.messCount += 1
            }

        })
        goods.buyList.push(buyGoods)
        setBuyGoods({buyerUserName:"",sellUserName:"",id:"",nameGoodsItem:"",status: false, month: ""})
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