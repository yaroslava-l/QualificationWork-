import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import ShowFail from "../Modals/showFail";
import {Context} from "../../index";
import ShowFailName from "../Modals/showFailName";
import ShowFailEmail from "../Modals/showFailEmail";
import {observer} from "mobx-react-lite";
import {registration} from "../../http/userAPI";

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
    const [newUser, setNewUser] = useState({name:"",email:"",password:"", yearsOld:"", male:"", PIV:"", tele:"", statusBlock:false})
    const addNewUser = (e) =>{
        e.preventDefault()
        // if(isLogin){
        //     // user.setCurrentUser({...User, id: Date.now()})
        //     // user.user.filter(users =>{
        //     //     if(users.name === user.currUser.name && users.password === user.currUser.password){
        //     //         user.setCurrentUser(users)
        //     //         user.setIsAuth(true)
        //     //         history.push(GOODS_ROUTE)
        //     //         console.log(user.currUser)
        //     //
        //     //     }
        //     //     else{
        //     //         setGoodsVisible(true)
        //     //     }
        //     // })
        //     setUser({name:'',password:''})
        // }else{
        const newUsers={
            ...newUser

        }
        // user.user.push(newUsers)
        // user.setIsAuth(true)

        //}
        const reg = async ()=>{
            const response = await registration(newUsers.email,newUsers.password,newUsers.name)
            console.log(response)
        }
        reg()
        setNewUser({name:"",email:"",password:"", yearsOld:"", male:"", PIV:"", tele:"", statusBlock:false})
        history.push(LOGIN_ROUTE)
    }


    return (
    <Form className='d-flex flex-column'>
            <Form.Control
                value={newUser.name}
                onChange={e => setNewUser({...newUser, name: e.target.value})}
                className='mt-3'
                placeholder='?????????????? ?????? nickname...'
            />
        <Form.Control
            value={newUser.email}
            onChange={e => setNewUser({...newUser, email: e.target.value})}
            className='mt-3'
            placeholder='?????????????? ?????? email...'
        />
            <Form.Control
                value={newUser.password}
                onChange={e => setNewUser({...newUser, password: e.target.value})}
                className='mt-3'
                type="password"
                placeholder='?????????????? ?????? ????????????...'
            />

        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <div>
                    ?? ????????????? <NavLink to={LOGIN_ROUTE}>????????????????!</NavLink>
                </div>
            <Button
                onClick={addNewUser}
                variant="outline-success"
            >
                ??????????????????????????????
            </Button>

        </Row>
        <ShowFail show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
        <ShowFailName show={failNameVisible} onHide={()=>setFailNameVisible(false)}/>
        <ShowFailEmail show={failEmailVisible} onHide={()=>setFailEmailVisible(false)}/>
    </Form>

    );
});

export default RegComp;