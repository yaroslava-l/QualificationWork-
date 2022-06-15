import React, {useContext, useState} from 'react';
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {getCookie, sendDataAuth} from "../../http";
import ShowResultAccess from "../Modals/showResultAccess";
const MessAbBuy = observer(({good}) => {
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    let status = false
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [access,setAccess] = useState(false)
    const [buyGoods, setBuyGoods] = useState({buyerUserId:"",sellUserId:"",goodsItemId:"",requestStatus:false, months:0})
    let showCard = true
    function buyGood(status){
        let today = new Date()
        buyGoods.buyerUserId = good.buyerUserId
        buyGoods.sellUserId = good.sellUserId
        buyGoods.goodsItemId = good.goodsItemId
        buyGoods.months = good.months
        buyGoods.requestStatus = status

        sendDataAuth(`http://localhost:8080/buy`, buyGoods,base64data)
            .then(()=>{
                console.log(buyGoods)
            }).catch((err)=>{
            console.log(err)
        })
        setBuyGoods({buyerUserId:"",sellUserId:"",goodsItemId:"",requestStatus:false, months:0})
        setAccess(true)
    }
    function sendMessAbOk(){
        status = true
        let data = {
            id:good.goodsItemId
        }
        sendDataAuth(`http://localhost:8080/buyGoods`, data,base64data)
            .then(()=>{
                console.log(data)
            }).catch((err)=>{
            console.log(err)
        })
        buyGood(status)
    }
    function sendMessAbNotOk(){
        status = false
        buyGood(status)
        showCard = false
    }
    return (

        <Card key={good.id}>
                    <div className='d-flex flex-row' style={{display: showCard ? "block" : "none"}}>
                        {user.user.filter(users=>{
                            if(users.id === good.buyerUserId){
                                return users
                            }
                        }).map(users=>
                            "Користувач "+users.name
                        )}
                        {goods.goodsItem.filter(goods=>{
                            if(goods.id === good.goodsItemId){
                                return goods
                            }
                        }).map(goods=>
                            " хоче орендувати у вас "+goods.name
                        )}
                        {goods.goodsItem.filter(goods=>{
                            if(goods.id === good.goodsItemId){
                                return goods
                            }
                        }).map(goods=>
                            " на "+good.months+" місяці "
                        )}
                        {user.user.filter(users=>{
                            if(users.id === good.buyerUserId){
                                return users
                            }
                        }).map(users=>
                            "   Номер телефону: 380"+users.phone
                        )}
                        <Button variant={'outline-success'} className="m-lg-2" onClick={()=>{
                            sendMessAbOk()
                        }}>Згоден</Button>
                        <Button variant={'outline-success'} className="m-lg-2" onClick={sendMessAbNotOk}>Не згоден</Button>
                    </div>

            <ShowResultAccess show={access} onHide={()=>setAccess(false)} status={status}/>
        </Card>
    );
});

export default MessAbBuy;