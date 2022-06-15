import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import ShowFail from "../Modals/showFail";
import {Context} from "../../index";
import ShowBlock from "../Modals/showBlock";
import {login, registration} from "../../http/userAPI";
import {
    $isAuth,
    $isNotAuth,
    authenticateUser, deleteCookie,
    getCookie,
    getResource,
    getResourceAuth,
    sendData,
    setCookie
} from "../../http";

const EnterComp = () => {
    const history = useHistory()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [blockVisible, setBlockVisible] = useState(false)
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [User, setUser] = useState({name:'',email:"",password:''})
    const addNewUser = (e) =>{
        e.preventDefault()
        const Users={
            ...User

        }
            const log = async () => {
            try {
                const response = await login(Users.email,Users.password,Users.name)
                setCookie('name',User.name)
                setCookie('pass',User.password)
                let base64data = btoa(`${getCookie('name')}:${getCookie('pass')}`)
                deleteCookie('checkUser')
                getResourceAuth('http://localhost:8080/users',base64data).then((data)=>{
                    console.log(data)
                    data.filter(users=>{
                        if(users.name === getCookie('name')){
                            user.setCurrentUser(users)
                            user.setIsAuth(true)
                            console.log(user.currUser)
                        }
                    })
                    user.setUser(data)

                })
                history.push(GOODS_ROUTE)
                console.log(response)
            }
            catch(e){
                setGoodsVisible(true)
            }

            }
            log()
            setUser({name:'',email:"",password:''})
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
                value={User.email}
                onChange={e => setUser({...User, email: e.target.value})}
                className='mt-3'
                placeholder='Введіть ваш email...'
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