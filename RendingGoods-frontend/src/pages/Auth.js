import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useLocation} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import {set} from "mobx";
import ShowFail from "../components/Modals/showFail";
import CreateServices from "../components/Modals/admin/CreateServices";
import EnterComp from "../components/auth/enterComp";
import RegComp from "../components/auth/regComp";
import {registration} from '../http/userAPI'

const Auth = observer(() => {
    const history = useHistory()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [User, setUser] = useState({name:'',password:''})
    const [newUser, setNewUser] = useState({name:"",email:"",password:"", yearsOld:"", male:"", PIV:"", tele:"", statusBlock:false})
    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height:window.innerHeight-54}}
        >

            <Card style={{width:600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
                {isLogin ?
                    <EnterComp/>
                    :
                    <RegComp/>
                }
            </Card>
        </Container>
    );
});

export default Auth;