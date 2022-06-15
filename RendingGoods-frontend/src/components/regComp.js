import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import ShowFail from "./Modals/showFail";
import {Context} from "../index";
import ShowFailName from "./Modals/showFailName";
import ShowFailEmail from "./Modals/showFailEmail";
import {observer} from "mobx-react-lite";

const RegComp = observer(() => {
    const history = useHistory()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [failNameVisible, setFailNameVisible] = useState(false)
    const [failEmailVisible, setFailEmailVisible] = useState(false)
    let fail = false
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState({name:"",email:"",password:"", yearsOld:"", male:"", PIV:"", tele:"", statusBlock:false, messCount:0})
    const addNewUser = (e) =>{
        e.preventDefault()
            const newUsers={
                ...newUser, id: Date.now()

            }
            user.user.filter(users=>{
                if(users.name === newUsers.name){
                    fail = true
                    setFailNameVisible(true)
                }
                else if(users.email === newUsers.email){
                    fail = true
                    setFailEmailVisible(true)
                }
            })
        if(!fail){
            user.user.push(newUsers)
            setNewUser({name:"",email:"",password:"", yearsOld:"", male:"", PIV:"", tele:"", statusBlock:false, messCount:0})
            history.push(LOGIN_ROUTE)
        }

        }
    return (
    <Form className='d-flex flex-column'>
            <Form.Control
                value={newUser.name}
                onChange={e => setNewUser({...newUser, name: e.target.value})}
                className='mt-3'
                placeholder='Введіть ваш nickname...'
            />
        <Form.Control
            value={newUser.email}
            onChange={e => setNewUser({...newUser, email: e.target.value})}
            className='mt-3'
            placeholder='Введіть ваш email...'
        />
            <Form.Control
                value={newUser.password}
                onChange={e => setNewUser({...newUser, password: e.target.value})}
                className='mt-3'
                type="password"
                placeholder='Введіть ваш пароль...'
            />

        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <div>
                    Є акаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
                </div>
            <Button
                onClick={addNewUser}
                variant="outline-success"
            >
                Зареєструватися
            </Button>

        </Row>
        <ShowFail show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
        <ShowFailName show={failNameVisible} onHide={()=>setFailNameVisible(false)}/>
        <ShowFailEmail show={failEmailVisible} onHide={()=>setFailEmailVisible(false)}/>
    </Form>

    );
});

export default RegComp;