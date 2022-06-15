import React, {useContext, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {SERVICES_ROUTE} from "../../utils/consts";
import {useHistory} from 'react-router-dom'
import {Context} from "../../index";
import {getCookie, sendDataAuth} from "../../http";
let goodsUserName = {
    name:""
}
const GoodsItem = ({good}) => {
    const history = useHistory()
    const {user} = useContext(Context)
    let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
    const {goods} = useContext(Context)
    goodsUserName = user.user.filter(users=>{
        if(users.id === good.creatorId){
            return users
        }
    })
    return (
        <Col md={9}>
            <Card style={{width:900,height:200,display:"flex",flexDirection:"row", borderWidth:"medium"}} className="mt-4" border={"black"}>
                  <div className='m-lg-3'>
                      <Image key={good.id} src={good.img} width={150} height={150}/>
                  </div>
                <div className="m-lg-3">
                    <div>
                        {good.name}
                    </div>
                    <div style={{width:500,height:170}} className='mt-3'>
                        Опис: {good.description}
                    </div>
                </div>
                <div className="m-lg-3 mt-3 d-flex flex-column">
                    <div className='d-flex justify-content-center'>
                        {/*{goodsUserName[0].name}*/
                            user.user.filter(users=>{
                                if(users.id === good.creatorId){
                                    return users
                                }
                            }).map(users=>
                                <div key={users.id} className='d-flex justify-content-center'>
                                    {users.name}
                                </div>
                            )
                        }
                    </div>
                    <div className='d-flex justify-content-center'>
                        Ціна: {good.cost}
                    </div>
                    <div className='d-flex justify-content-center flex-column mt-auto' style={{color: "black"}}>

                        <Button variant={"outline-success"} style={{cursor:"pointer"}} onClick={()=>{
                            let data = {
                                id:good.id
                            }
                            sendDataAuth(`http://localhost:8080/goodsView`, data,base64data)
                                .then(()=>{
                                    console.log(data)
                                }).catch((err)=>{
                                console.log(err)
                            })
                            good.views += 1
                            goods.setCurrGoods(good)
                            history.push(SERVICES_ROUTE+'/'+good.id)

                        }}>Переглянути</Button>
                        <div className='d-flex justify-content-center'  style={{color: "black", fontSize:12}}>
                            Переглянуто: {good.views}
                        </div>
                        <div className='d-flex justify-content-center'  style={{color: "black", fontSize:12}}>
                            Рейтинг: {good.rating}
                        </div>
                    </div>


                </div>


            </Card>
        </Col>
    );
};

export default GoodsItem;