import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateGoods from "../components/Modals/goods/CreateGoods";
import CreateServices from "../components/Modals/admin/CreateServices";
import ShowUserList from "../components/Modals/admin/showUserList";
import ShowBlockList from "../components/Modals/admin/showBlockList";
import ShowFailDelete from "../components/Modals/showFailDelete";

const Admin = () => {
    const [blockVisible, setBlockVisible] = useState(false)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [usersVisible, setUsersVisible] = useState(false)
    return (
        <Container className='d-flex flex-column'>
            <Button variant={"outline-dark"} className='mt-4 p-2' onClick={()=>setUsersVisible(true)}>Переглянути список користувачів</Button>
            <ShowUserList show={usersVisible} onHide={()=>setUsersVisible(false)}/>
            <Button variant={"outline-dark"} className='mt-4 p-2' onClick={()=>setGoodsVisible(true)}>Додати категорію</Button>
            <CreateServices show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
            <Button variant={"outline-dark"} className='mt-4 p-2' onClick={()=>setBlockVisible(true)}>Видалити категорію</Button>
            <ShowBlockList show={blockVisible} onHide={()=>setBlockVisible(false)} hideOnClick = {()=>{setDeleteVisible(true)}}/>
            <ShowFailDelete show={deleteVisible} onHide={()=>setDeleteVisible(false)}/>
        </Container>
    );
};

export default Admin;