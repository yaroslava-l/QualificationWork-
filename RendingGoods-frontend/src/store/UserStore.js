import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._userss = []
        this._currentUser = []
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._userss = user
    }
    setCurrentUser(currUser){
        this._currentUser = currUser
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._userss
    }
    get currUser(){
        return this._currentUser
    }
}