import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../router";
import {Context} from "../index";
import {GOODS_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path,Component})=>
                <Route key = {path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path,Component})=>
                <Route key = {path} path={path} component={Component} exact/>
            )}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>
    );
};

export default AppRouter;