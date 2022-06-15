import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Container, Row} from "react-bootstrap";
import GoodsItem from "./GoodsItem";
import CreateGoods from "./Modals/CreateGoods";
const GoodsList = observer(() => {
    const {goods} = useContext(Context)
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [sortByUser,setSortByUser]=useState(false)
    const [sortByUserAdmin,setSortByUserAdmin]=useState(false)
    const [sortByUserAdmins,setSortByUserAdmins]=useState(false)
    let today = new Date()
    let todayMonth = today.getMonth()
    if(user.currUser.name === "admin"){
        if(!sortByUserAdmins){
            user.user.filter(user=>{
                if(user.name === "admin"){
                    if(user.checkUser === ""){
                        setSortByUserAdmin(false)
                    }
                    else{
                        setSortByUserAdmin(true)
                    }
                }


            })
            setSortByUserAdmins(true)
        }
    }



    return (
        <Container>
            {user.isAuth ?
                <Button variant={"outline-success"} onClick={()=>setGoodsVisible(true)}>Створити оголошення</Button> : <div></div>
            }
            <CreateGoods show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
            {
                user.isAuth ? <Button variant={"outline-success"} onClick={()=>{
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

        <Row className='d-flex'>

            {
                goods.goodsItem.filter((good)=>{
                    if(!good.blockStatus && !good.status && +good.month < todayMonth+1 && good.month === 0) {
                        if (goods.selectedGoods.name) {
                            if (good.goods === goods.selectedGoods.name) {
                                return good
                            }
                        } else if (sortByUser) {
                            if (user.currUser.name === good.userName) {
                                return good
                            }
                        } else if (sortByUserAdmin) {
                            if (user.user[0].checkUser === good.userName) {
                                return good
                            }
                        }
                        else {
                            return good
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