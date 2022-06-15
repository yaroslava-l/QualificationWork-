import React, {useContext} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import client from './client.jpg'
import {GOODS_ROUTE, SERVICES_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from 'react-router-dom'

const UserListItem = observer(({users}) => {
    const history = useHistory()
    const {user} = useContext(Context)
    const {goods}= useContext(Context)
    let count = 0
    function blockUser(){
        user.user.filter(user=>{
            if(user.name === users.name){
                user.statusBlock = true
            }
        })
    }
    function watchUserGoods(){
        user.user.filter(user=>{
            if(user.name === "admin"){
                user.checkUser = users.name
            }
        })
        history.push(GOODS_ROUTE)
    }
    return (
        <Card style={{width:600,height:150,display:"flex",flexDirection:"row"}} className="mt-4" border={"black"}>
            <div className='m-lg-auto'>
                <img src={client} style={{width:70,height:70}} alt=""/>
            </div>
            <div>
                {
                    goods.goodsItem.filter(goods=>{
                        if(goods.userName === users.name){
                            count += goods.rating
                        }
                    })
                }
            </div>
            <div className="m-lg-auto d-flex flex-column">
                <div >
                    {
                        users.name
                    }

                </div>
                <div>
                    {"Рейтинг: "+count}
                </div>
            </div>

            <div className="m-lg-auto">
                <Button variant={"outline-success"} onClick={watchUserGoods}>Переглянути товари</Button>
            </div>
            <div className="m-lg-auto">
                <Button variant={"outline-danger"} onClick={blockUser}>Заблокувати</Button>
            </div>



        </Card>
    );
});

export default UserListItem;