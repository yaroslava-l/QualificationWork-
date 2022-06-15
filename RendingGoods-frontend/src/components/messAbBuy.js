import React, {useContext, useState} from 'react';
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const MessAbBuy = observer(({good}) => {
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    const [buyGoods, setBuyGoods] = useState({buyerUserName:"",sellUserName:"",id:"",nameGoodsItem:"",status:""})
    function buyGood(status){
        buyGoods.buyerUserName = good.buyerUserName
        buyGoods.sellUserName = good.sellUserName
        buyGoods.id = good.id
        buyGoods.nameGoodsItem = good.nameGoodsItem
        buyGoods.status = status
        user.user.filter(users=>{
            if(buyGoods.sellUserName === users.name){
                users.messCount -= 1
            }

        })
        goods.goodsItem[good.id-1].status = true
        goods.buyStatus.push(buyGoods)
        setBuyGoods({buyerUserName:"",sellUserName:"",id:"",nameGoodsItem:"",status:""})
    }
    function sendMessAbOk(){
        let status = true
        goods.buyList.filter(goods=>{
            if(goods.id === good.id){
                goods.status = true
            }

        })
        buyGood(status)
    }
    function sendMessAbNotOk(){
        let status = false
        goods.buyList.filter(goods=>{
            if(goods.id === good.id){
                goods.status = true
            }

        })
        buyGood(status)
    }
    return (

        <Card key={good.id}>
                    <div className='d-flex flex-row'>
                        {"Користувач " + good.buyerUserName + " хоче орендувати ваше послугу на "+ good.month+ " місяців: " + good.nameGoodsItem}
                        {user.user.filter(users=>{
                            if(users.name === good.buyerUserName){
                                return users
                            }
                        }).map(users=>
                            <div>{"Номер телефону: "+users.tele}</div>
                        )}
                        <Button variant={'outline-success'} className="m-lg-2" onClick={()=>{
                            sendMessAbOk()
                        }}>Згоден</Button>
                        <Button variant={'outline-success'} className="m-lg-2" onClick={sendMessAbNotOk}>Не згоден</Button>
                    </div>


        </Card>
    );
});

export default MessAbBuy;