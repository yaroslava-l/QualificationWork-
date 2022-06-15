import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import client from './client.jpg'
import 'bootstrap'
import {Context} from "../index";
import ShowResult from "../components/Modals/showResult";
import CreateServices from "../components/Modals/admin/CreateServices";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import ShowTime from "../components/Modals/goods/showTime";
import {GOODS_ROUTE, SERVICES_ROUTE} from "../utils/consts";
import {getCookie, sendDataAuth, sendDeleteDataAuth} from "../http";
let currUserChar = {
    PIV:"",
    tele:""
}
const Services = observer(() => {
    const history = useHistory()
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [timeVisible, setTimeVisible] = useState(false)
    const [check, setCheck] = useState(false)
    const [buyGoods, setBuyGoods] = useState({buyerUserName:"",sellUserName:"",id:"",nameGoodsItem:"",status:false})
    function likeGoods(){
        goods.goodsItem.filter(good=>{
            if(good.id === goods.currGoods.id){
                let data = {
                    id:good.id,
                    liked:true
                }
                sendDataAuth(`http://localhost:8080/editRating`, data,base64data)
                    .then(()=>{
                        console.log(data)
                    }).catch((err)=>{
                    console.log(err)
                })
                good.rating += 1
            }
        })
    }
    function disLikeGoods(){
        goods.goodsItem.filter(good=>{
            if(good.id === goods.currGoods.id){
                let data = {
                    id:good.id,
                    liked:false
                }
                sendDataAuth(`http://localhost:8080/editRating`, data,base64data)
                    .then(()=>{
                        console.log(data)
                    }).catch((err)=>{
                    console.log(err)
                })
                good.rating -= 1
            }
        })
    }
    function deleteGoods(){
        goods.goodsItem.filter(good=>{
            if(good.name === goods.currGoods.name){
                let data = {
                    id:good.id
                }
                sendDeleteDataAuth('http://localhost:8080/deleteGoods',data,base64data).then(()=>{
                    console.log(data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
        history.push(GOODS_ROUTE)
    }
    if(!check){
        user.user.filter(users=>{
            if(users.name === goods.currGoods.userName){
                currUserChar.PIV = users.PIV

            }
        })
        setCheck(true)
    }
    function blockGoods(){
        goods.goodsItem.filter(good=>{
            if(good.name === goods.currGoods.name){
                let data = {
                    id:good.id
                }
                sendDataAuth('http://localhost:8080/blockGoods',data,base64data).then(()=>{
                    console.log(data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
        history.push(GOODS_ROUTE)
    }
    function unBlockGoods(){
        goods.goodsItem.filter(good=>{
            if(good.name === goods.currGoods.name){
                let data = {
                    id:good.id
                }
                sendDataAuth('http://localhost:8080/unBlockGoods',data,base64data).then(()=>{
                    console.log(data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
        history.push(GOODS_ROUTE)
    }

    return (
        <Container className='mt-4'>
            <div className='d-flex flex-row'>
                <Col md={8} style={{height:550}}>
                    <Image src={goods.currGoods.img} width={800} height={500}/>
                </Col>
                <Col md={4} style={{height:550}} className='d-flex flex-column'>
                    <Card style={{height:500}} border={"black"}>
                        <div className='d-flex justify-content-center' style={{fontSize:20}}>
                            Користувач
                        </div>
                        <div className='d-flex justify-content-center'>
                            {
                                user.user.filter(users => {
                                    if (users.id === goods.currGoods.creatorId) {
                                        return users
                                    }
                                }).map(users =>
                                    <Image src={users.img} width={150} height={150}/>
                                )
                            }
                            <div className='mt-4 m-lg-3'>
                                {/*{goodsUserName[0].name}*/
                                    user.user.filter(users=>{
                                        if(users.id === goods.currGoods.creatorId){
                                            return users
                                        }
                                    }).map(users=>
                                        <div className='d-flex justify-content-center'>
                                            {users.name}
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {currUserChar.PIV}
                            </div>
                        </div>

                        <div className='d-flex justify-content-center flex-column mt-auto mb-5'>
                            <div className='d-flex justify-content-around mb-4'>
                                <div style={{fontSize:20}}>
                                    Ціна:
                                </div>
                                <div className=''>
                                    {goods.currGoods.cost} грн/міс
                                </div>

                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button variant={'outline-success'} onClick={()=>{
                                    setTimeVisible(true)
                                    // setGoodsVisible(true)
                                }
                                }>Орендувати</Button>
                            </div>
                        </div>

                    </Card>

                </Col>
            </div>
            <div className="d-flex flex-column">
                <div className='mb-4'>
                <Button variant={"outline-success"} onClick={likeGoods}>
                    {"Подобається " + goods.currGoods.rating}
                </Button>
                <Button variant={"outline-danger"} onClick={disLikeGoods}>
                    Не подобається
                </Button>
                </div>
                <Card>
                    <div className="mb-lg-2 mt-4 m-lg-2" style={{fontSize:25}}>
                            Опис:
                    </div>
                    <Col md={6} style={{height:550}} className="d-flex">

                        <div className="">
                            {goods.currGoods.description}
                        </div>
                    </Col>
                </Card>
                {user.currUser.name === "admin" ?
                    <div>
                        <Button variant={"outline-danger"} onClick={deleteGoods}>
                            Видалити товар
                        </Button>
                        <div>{!goods.currGoods.blocked ?
                            <Button variant={"outline-danger"} onClick={
                                blockGoods}>
                                Заблокувати товар
                            </Button>
                            :
                            <Button variant={"outline-danger"} onClick={unBlockGoods}>
                            Разблокувати товар
                            </Button>
                        }
                        </div>

                    </div>
                    :
                    <div></div>
                }
            </div>

        <ShowResult show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
            <ShowTime show={timeVisible}
                      onHide={()=>setTimeVisible(false)}
                      hideOnClick = {()=>{setGoodsVisible(true)}
            }
                      good={goods.currGoods}/>
        </Container>
    );
});

export default Services;