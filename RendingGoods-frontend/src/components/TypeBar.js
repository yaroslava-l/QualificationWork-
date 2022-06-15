import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {goods} = useContext(Context)
    return (
        <ListGroup className="mt-1">
            {goods.goods.map(type=>
                <ListGroup.Item
                    style={{cursor:"pointer"}}
                    active={type.id === goods.selectedGoods.id}
                    onClick={()=>{
                        if(goods.selectedGoods.name){
                            goods.setSelectedGoods({})
                        }else{
                            goods.setSelectedGoods(type)
                        }

                    }
                    }
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;