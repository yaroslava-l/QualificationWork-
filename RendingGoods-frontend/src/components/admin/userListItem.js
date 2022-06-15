import React, {useContext} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import client from '../client.jpg'
import {GOODS_ROUTE, SERVICES_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory} from 'react-router-dom'
import {getCookie, getResourceAuth, sendDataAuth, setCookie} from "../../http";

const UserListItem = observer(({users}) => {
    const history = useHistory()
    const {user} = useContext(Context)
    const {goods}= useContext(Context)
    let count = 0
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)

    function blockUser(){
        user.user.filter(user=>{
            if(user.name === users.name){
                let data = {
                    id:users.id
                }
                sendDataAuth('http://localhost:8080/blockUser',data,base64data).then(()=>{
                    console.log(data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
        goods.goodsItem.filter(good=>{
            if(good.userName === users.name){
                good.blockStatus = true
            }
        })
    }
    function unBlockUser(){
        user.user.filter(user=>{
            if(user.name === users.name){
                let data = {
                    id:users.id
                }
                sendDataAuth('http://localhost:8080/unBlockUser',data,base64data).then(()=>{
                    console.log(data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
        goods.goodsItem.filter(good=>{
            if(good.userName === users.name){
                good.blockStatus = true
            }
        })
    }
    function watchUserGoods(){
        user.user.filter(user=>{
            if(user.name === "admin"){
                setCookie('checkUser',users.id)
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
                        if(goods.creatorId === users.id){
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
                    {
                        users.blocked ?
                            'Заблокований' : ''
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
                {!users.blocked ?
                    <Button variant={"outline-danger"} onClick={blockUser}>Заблокувати</Button>
                :
                    <Button variant={"outline-danger"} onClick={unBlockUser}>Розблокувати</Button>
                }
            </div>



        </Card>
    );
});

export default UserListItem;