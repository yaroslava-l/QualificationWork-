import React, {useContext, useState} from 'react';
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Context} from "../index";

const MessAbAccess = ({goodStatus}) => {
    const {user} = useContext(Context)
    let userTele
    user.user.filter(users=>{
        if(goodStatus.sellUserName === users.name){
            userTele = users.tele
        }
        }
    )
    return (
        <Card key={goodStatus.id}>
            <div className='d-flex flex-row'>
                {goodStatus.status ?
                    "Користувач " + goodStatus.sellUserName + " згодився на оренду вами послуги: " + goodStatus.nameGoodsItem
                    :
                    "Користувач " + goodStatus.sellUserName + " не згодився на оренду вами послуги: " + goodStatus.nameGoodsItem
                }
                <div>{"Номер телефону: "+userTele}</div>
            </div>

        </Card>
    );
};

export default MessAbAccess;