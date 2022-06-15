import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import client from './client.jpg'
import {Context} from "../index";
import {Button} from "react-bootstrap";
import GoodsItem from "../components/goods/GoodsItem";
import MessAbBuy from "../components/profile/messAbBuy";
import MessAbAccess from "../components/profile/messAbAccess";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import CreateServices from "../components/Modals/admin/CreateServices";
import AddImg from "../components/Modals/profile/addImg";
import {getCookie, getResource, getResourceAuth, sendDataAuth} from "../http";
const Profile = observer(() => {
    const {user} = useContext(Context)
    const {goods} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    let boughtStatus = false
    let doubleStatus = false
    let doubleStatus1 = false
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    console.log(user.currUser)
    user.user.filter(users=>{
        if(users.id === user.currUser.id){
            user.setCurrentUser(users)
        }
    })
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

    function changeUserSetup(){
        user.user.filter(users=>{
            if(users.id === user.currUser.id){
                let data = {
                    ...newUserChar
                }
                console.log(data)
                sendDataAuth(`http://localhost:8080/editUserSettings`, data,base64data)
                    .then(()=>{
                        console.log(data)
                    }).catch((err)=>{
                    console.log(err)
                })
            }
            editData()
        })
    }
    useEffect(()=>{
        getResourceAuth('http://localhost:8080/buyList',base64data
        ).then(data =>
            goods.setBuyList(data)
        )
    },[])
    function editData(){
        getResourceAuth('http://localhost:8080/users',base64data
        ).then(data =>{
            data.filter(users=>{
                if(users.name === getCookie('name')){
                    user.setCurrentUser(users)
                    console.log(user.currUser)
                }
            })
        user.setUser(data)
        }
        )
    }
    return (
        <Container>
            <Card md={12} border={"black"} className="d-flex flex-row">
                <Col md={6} >
                <div className='d-flex justify-content-center flex-column'>
                        <Image src={user.currUser.img} width={150} height={150} onClick={()=>setGoodsVisible(true)} style={{cursor:"pointer"}}/>
                        {/*<Button variant={"outline-success"} onClick={()=>setGoodsVisible(true)}>Змінити</Button>*/}
                    <div>
                        <Form className='d-flex flex-column'>
                            <small id="nameHelp" className="form-text text-muted">Nickname</small>
                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.name}
                                aria-describedby="nameHelp"
                                value={newUserChar.name}
                                onChange={e=>setNewUserChar({...newUserChar, name: e.target.value})}
                            />
                            <small id="emailHelp" className="form-text text-muted">Email</small>

                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.email}
                                aria-describedby="emailHelp"
                                value={newUserChar.email}
                                onChange={e=>setNewUserChar({...newUserChar, email: e.target.value})}
                            />
                            <small id="teleHelp" className="form-text text-muted">Telephone</small>
                            <div className="d-flex flex-row">
                                <div className="mt-4">
                                    <label htmlFor="">380</label>
                                </div>

                                <Form.Control
                                    className='mt-3'
                                    placeholder={user.currUser.phone}
                                    aria-describedby="teleHelp"
                                    value={newUserChar.phone}
                                    onChange={e=>setNewUserChar({...newUserChar, phone: +e.target.value})}
                                />
                            </div>

                            <small id="pivHelp" className="form-text text-muted">ПІВ</small>
                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.surname}
                                aria-describedby="pivHelp"
                                value={newUserChar.surname}
                                onChange={e=>setNewUserChar({...newUserChar, surname: e.target.value})}

                            />
                            <small id="maleHelp" className="form-text text-muted">Стать</small>
                            <select
                                id="dataList"
                                value={newUserChar.male}
                                onChange={e=>{
                                    setNewUserChar({...newUserChar, male: e.target.value})
                                }}
                            >
                                <option disabled={true}>

                                </option>
                                <option value="Чоловік">
                                    Чоловік
                                </option>
                                <option value="Жінка">
                                    Жінка
                                </option>
                            </select>
                            <small id="yearsHelp" className="form-text text-muted">Вік</small>

                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.yearsOld}
                                aria-describedby="yearsHelp"
                                value={newUserChar.yearsOld}
                                onChange={e=>setNewUserChar({...newUserChar, yearsOld: +e.target.value})}
                            />
                                <Button
                                    variant="outline-success"
                                    onClick={changeUserSetup}
                                >
                                    Зберегти
                                </Button>

                        </Form>
                    </div>
                </div>
            </Col>
                <Col md={6}>
                    <div>
                        Повідомлення

                            {
                                goods.buyList.filter(good => {
                                    if(good.sellUserId === 7){
                                        console.log(good)
                                    }
                                    goods.buyList.filter(good2 => {
                                        if(+good.buyerUserId === +good2.buyerUserId && +good.sellUserId === +good2.sellUserId && +good.goodsItemId === +good2.goodsItemId && +good.id !== +good2.id){
                                            if(good.buyerUserId === 6){
                                            }
                                            doubleStatus = true
                                        }
                                    })
                                    goods.goodsItem.filter(goodItem=>{
                                        if(goodItem.id === good.goodsItemId){
                                            if(goodItem.bought){
                                                boughtStatus = true
                                            }
                                        }
                                    })
                                        if (!boughtStatus) {
                                            if(!doubleStatus) {
                                            if (user.currUser.id === good.sellUserId) {
                                                if (!good.requestStatus) {
                                                    return good
                                                }
                                            }
                                        }
                                            else{
                                                doubleStatus = false
                                            }
                                    }
                                    else
                                    {
                                            boughtStatus = false
                                    }

                                }).map(goods =>
                                    <MessAbBuy className="mb-lg-2" key={goods.id} good={goods}/>
                                )
                            }
                        {
                            goods.buyList.filter(good=>{
                            if(user.currUser.id === good.buyerUserId){


                                goods.buyList.filter(good2 => {
                                    if(+good.buyerUserId === +good2.buyerUserId && +good.sellUserId === +good2.sellUserId && +good.goodsItemId === +good2.goodsItemId && +good.id !== +good2.id){
                                        doubleStatus = true
                                    }
                                })
                                if(good.sellUserId === 5){
                                }
                                if(doubleStatus && doubleStatus1){

                                }
                                else{
                                    doubleStatus1 = true
                                    return good
                                }

                            }
                        }).map(goods=>
                            <MessAbAccess className="mb-lg-2" key={goods.id} goodStatus={goods}/>
                            )
                         }

                    </div>
                </Col>
            </Card>

            <AddImg show={goodsVisible} onHide={()=>setGoodsVisible(false)} editData = {()=>editData()}/>
        </Container>
    );
});

export default Profile;