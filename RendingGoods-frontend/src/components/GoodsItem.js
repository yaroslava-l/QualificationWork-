import React, {useContext, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {SERVICES_ROUTE} from "../utils/consts";
import {useHistory} from 'react-router-dom'
import {Context} from "../index";

const GoodsItem = ({good}) => {
    const history = useHistory()
    const {goods} = useContext(Context)
    return (
        <Col md={9}>
            <Card style={{width:900,height:200,display:"flex",flexDirection:"row", borderWidth:"medium"}} className="mt-4" border={"black"}>
                  <div className='m-lg-3'>
                      <Image width={150} height={150} src={good.img}/>
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
                        {good.userName}
                    </div>
                    <div className='d-flex justify-content-center'>
                        Ціна: {good.cost}
                    </div>
                    <div className='d-flex justify-content-center flex-column mt-auto' style={{color: "black"}}>

                        <Button variant={"outline-success"} style={{cursor:"pointer"}} onClick={()=>{

                            good.countCheck += 1
                            goods.setCurrGoods(good)
                            history.push(SERVICES_ROUTE+'/'+good.id)

                        }}>Переглянути</Button>
                        <div className='d-flex justify-content-center'  style={{color: "black", fontSize:12}}>
                            Переглянуто: {good.countCheck}
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