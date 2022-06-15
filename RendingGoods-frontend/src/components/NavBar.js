import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, GOODS_ROUTE, LOGIN_ROUTE,PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import {deleteCookie, getCookie, getResourceAuth} from "../http";
import MessAbBuy from "./profile/messAbBuy";
const NavBar = observer( () => {
    const history = useHistory()
    const {user} = useContext(Context)
    const {goods} = useContext(Context)
    let doubleStatus = false
    let boughtStatus = false
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    let messCount = 0
    let doubleStatus1 = false
    // if(user.currUser.name === undefined){
    //     getResourceAuth('http://localhost:8080/users',base64data).then((data)=>{
    //         console.log(data)
    //         data.filter(users=>{
    //             if(users.name === getCookie('name')){
    //                 user.setCurrentUser(users)
    //                 console.log(user.currUser)
    //             }
    //         })
    //         user.setUser(data)
    //
    //     })
    // }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={GOODS_ROUTE}> Оренда товарів та послуг</NavLink>
                {getCookie('name') || user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {(user.currUser.name === 'admin') ?
                            <Button variant={"outline-light"} onClick={() => {
                                history.push(ADMIN_ROUTE)
                            }
                            }>
                                Адмін панель
                            </Button>
                            :
                            <div>
                                <Button variant={"outline-light"} onClick={() => {
                                    history.push(PROFILE_ROUTE)
                                }}>
                                    Повідомлень: {
                                    goods.buyList.filter(good => {
                                        goods.buyList.filter(good2 => {
                                            if(+good.buyerUserId === +good2.buyerUserId && +good.sellUserId === +good2.sellUserId && +good.goodsItemId === +good2.goodsItemId && +good.id !== +good2.id){
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
                                                if (user.currUser.id === good.sellUserId || user.currUser.id === good.buyerUserId) {
                                                    messCount++
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

                                    })
                                }
                                    {
                                        goods.buyList.filter(good=> {
                                            if (user.currUser.id === good.buyerUserId) {
                                                goods.buyList.filter(good2 => {
                                                    if (+good.buyerUserId === +good2.buyerUserId && +good.sellUserId === +good2.sellUserId && +good.goodsItemId === +good2.goodsItemId && +good.id !== +good2.id) {
                                                        doubleStatus = true
                                                    }
                                                })
                                                if (doubleStatus && doubleStatus1) {

                                                } else {
                                                    doubleStatus1 = true
                                                    messCount++
                                                }
                                            }
                                        })
                                    }
                                    {
                                        messCount
                                    }
                                </Button>
                                <Button variant={"outline-light"} onClick={() => {
                                    history.push(PROFILE_ROUTE)
                                }}>
                                    Мій профіль
                                </Button>
                            </div>
                        }

                        <Button variant={"outline-light"} onClick={() => {
                            user.setCurrentUser({})
                            deleteCookie('name')
                            deleteCookie('pass')
                            user.setIsAuth(false)
                            history.push(LOGIN_ROUTE)
                        }}
                                className="mx-lg-2">Вийти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;