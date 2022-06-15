import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const MessAbAccess = ({goodStatus}) => {
    const {user} = useContext(Context)
    const {goods} = useContext(Context)
    console.log(goodStatus)
    return (
        <Card key={goodStatus.id}>
            <div className='d-flex flex-row'>
                {goodStatus.requestStatus ?
                    // "Користувач " + goodStatus.sellUserName + " згодився на оренду вами послуги: " + goodStatus.nameGoodsItem
                    // :
                    // "Користувач " + goodStatus.sellUserName + " не згодився на оренду вами послуги: " + goodStatus.nameGoodsItem
                    <div>{user.user.filter(users=>{
                        if(users.id === goodStatus.sellUserId){
                            return users
                        }
                    }).map(users=>"Користувач "+users.name)}
                        {
                            goods.goodsItem.filter(good=>{
                                if(good.id === goodStatus.goodsItemId){
                                    return good
                                }
                            }).map(good=>" згодився на оренду вами послуги: "+good.name+".")
                        }
                        {
                            user.user.filter(users=>{
                                if(users.id === goodStatus.sellUserId){
                                    return users
                                }
                            }).map(users=>" Зателефонуйте йому за номером: 380"+users.phone)
                        }
                    </div>
                    :
                    <div>
                        {user.user.filter(users=>{
                        if(users.id === goodStatus.sellUserId){
                            return users
                        }
                    }).map(users=>"Користувач "+users.name)}
                        {
                            goods.goodsItem.filter(good=>{
                                if(good.id === goodStatus.goodsItemId){
                                    return good
                                }
                            }).map(good=>" не згодився на оренду вами послуги: "+good.name)
                        }
                    </div>
                }
            </div>

        </Card>
    );
};

export default MessAbAccess;