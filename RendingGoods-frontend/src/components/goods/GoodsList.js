import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button, Container, Form, Row} from "react-bootstrap";
import GoodsItem from "./GoodsItem";
import {fetchGood, fetchGoodItem} from "../../http/goodsAPI";
import CreateGoods from "../Modals/goods/CreateGoods";
import {getCookie, getResource, getResourceAuth} from "../../http";
const GoodsList = observer(() => {
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [sortByUser,setSortByUser]=useState(false)
    const [sortByBlock,setSortByBlock]=useState(false)
    const [sortByUserAdmin,setSortByUserAdmin]=useState(false)
    const [sortByUserAdmins,setSortByUserAdmins]=useState(false)
    const [searchCheck,setSearchCheck]=useState("")
    let today = new Date()
    let todayMonth = today.getMonth()
    let headers = new Headers()
    useEffect(()=>{
        getResourceAuth('http://localhost:8080/goods',base64data
        ).then(data =>
            goods.setGoodsItem(data)
        )
    },[])
    useEffect(()=>{
        getResourceAuth('http://localhost:8080/goodsCategories',base64data
        ).then(data =>
            goods.setGoods(data)
        )
    },[])
    console.log(goods.goodsItem)


    return (
        <Container>
            <Form.Control
                className='mt-3'
                placeholder="Пошук"
                onChange={e=>{
                    setSearchCheck(e.target.value)
                }}
            />
            {getCookie('name') ?
                <Button variant={"outline-success"} onClick={()=>setGoodsVisible(true)}>Створити оголошення</Button> : <div></div>
            }
            <CreateGoods show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
            {
                getCookie('name') ? <Button variant={"outline-success"} onClick={()=>{
                    if(sortByUser){
                        setSortByUser(false)
                    }else{
                        setSortByUser(true)
                    }

                }}
                >
                    Переглянути свої оголошення
                </Button> : <div></div>
            }
            {user.currUser.name === 'admin' ?
                <Button variant={"outline-danger"} onClick={()=>{
                    if(sortByBlock){
                        setSortByBlock(false)
                    }else{
                        setSortByBlock(true)
                    }

                }}
                >
                    Перегляд заблокованих
                </Button>
                :
                <div></div>
            }

        <Row className='d-flex'>

            {
                goods.goodsItem.filter(good=>{
                    if (sortByBlock){
                        if(good.blocked){
                            return good
                        }
                    }
                    else {
                        if (!good.bought && !good.blocked) {
                            if (goods.selectedGoods.name) {
                                if (goods.selectedGoods.id === good.categoryId) {
                                    return good
                                }
                            }
                            else if (goods.selectedCost !== 0) {
                                if (goods.selectedCost > good.cost) {
                                    return good
                                }
                            }else if (getCookie('checkUser')) {
                                if (+good.creatorId === +getCookie('checkUser')) {
                                    return good
                                }
                            } else if (sortByUser) {
                                if (good.creatorId === user.currUser.id) {
                                    return good
                                }
                            } else if (searchCheck === "") {
                                return good
                            } else if (searchCheck !== "") {
                                if (good.name.startsWith(searchCheck)) {
                                    return good
                                }
                            } else {
                                return good
                            }
                        }
                    }

                }).map(goods=>
                <GoodsItem className="mb-lg-2" key={goods.id} good={goods}/>
            )}
        </Row>
        </Container>
    );
});

export default GoodsList;