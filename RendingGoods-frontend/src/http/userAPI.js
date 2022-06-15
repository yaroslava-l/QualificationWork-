import {$isAuth,$isNotAuth} from "./index";

export const registration = async(email,password,name)=>{
    const {data} = await $isNotAuth.post('/registration',{email,password,name})
    return data
}
export const login = async(email,password,name)=>{
    const {data} = await $isNotAuth.post('/login',{email,password,name})
    return data
}
export const fetchUser = async()=>{
    const {data} = await $isNotAuth.get('/user')
    return data
}