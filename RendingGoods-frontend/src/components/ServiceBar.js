import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const ServiceBar = observer(() => {
    const {goods} = useContext(Context)
    return (
        <ListGroup className="mt-1">
            {goods.services.map(type=>
                <ListGroup.Item
                    style={{cursor:"pointer"}}
                    active={type.id === goods.selectedServices.id}
                    onClick={()=> goods.setSelectedServices(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default ServiceBar;