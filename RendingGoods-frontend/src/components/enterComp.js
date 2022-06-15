import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import ShowFail from "./Modals/showFail";
import {Context} from "../index";
import ShowBlock from "./Modals/showBlock";

const EnterComp = () => {
    const history = useHistory()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [blockVisible, setBlockVisible] = useState(false)
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [User, setUser] = useState({name:'',password:''})
    const addNewUser = (e) =>{
        e.preventDefault()
            user.setCurrentUser({...User, id: Date.now()})
            user.user.filter(users =>{
                console.log(users.name + users.statusBlock)
                if(users.name === user.currUser.name && users.password === user.currUser.password){
                    if(users.statusBlock){
                        setGoodsVisible(false)
                        setBlockVisible(true)
                    }
                    else{
                        user.setCurrentUser(users)
                        history.push(GOODS_ROUTE)
                        user.setIsAuth(true)
                    }


                }
                else{
                    setGoodsVisible(true)
                }
            })
            setUser({name:'',password:''})
    }
    return (
        <Form className='d-flex flex-column'>
                <Form.Control
                    value={User.name}
                    onChange={e => setUser({...User, name: e.target.value})}
                    className='mt-3'
                    placeholder='Введіть ваш nickname...'
                />
                <Form.Control
                    value={User.password}
                    onChange={e => setUser({...User, password: e.target.value})}
                    className='mt-3'
                    type="password"
                    placeholder='Введіть ваш пароль...'
                />

            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <div>
                        Немає акаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструйся!</NavLink>
                    </div>
                <Button
                    onClick={addNewUser}
                    variant="outline-success"
                >
                    Увійти
                </Button>

            </Row>
            <ShowBlock show={blockVisible} onHide={()=>setBlockVisible(false)}/>
            <ShowFail show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
        </Form>

    );
};

export default EnterComp;