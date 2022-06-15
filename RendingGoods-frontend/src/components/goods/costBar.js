import React, {useContext} from 'react';
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const CostBar = observer(() => {
    const {goods} = useContext(Context)
    let data = [1000,2000,3000,4000,5000]
    return (
        <ListGroup className="mt-1">
            {data.map(cost=>
                <ListGroup.Item
                    style={{cursor:"pointer"}}
                    active={cost === goods.selectedCost}
                    onClick={()=>{
                        if(goods.selectedCost !== 0){
                            console.log(cost)
                            goods.setSelectedCost(0)
                        }
                        else{
                            goods.setSelectedCost(cost)
                            console.log(cost)
                            console.log(goods.selectedCost)
                        }

                    }
                    }
                    key={cost}
                >
                    {"До "+cost}
                </ListGroup.Item>
            )}
        </ListGroup>


    );
})

export default CostBar;