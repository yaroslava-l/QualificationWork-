import {$isAuth,$isNotAuth} from "./index";
export const createGood = async(nameGoods)=>{
    const {data} = await $isAuth.post('/goods',{nameGoods})
    return data
}
export const fetchGood = async()=>{
    const {data} = await $isAuth.get('/goods')
    return data
}
export const createGoodItem = async(name,img,description,cost, userName,goods)=>{
    const {data} = await $isAuth.post('/goodsItem',{name,img,description,cost, userName,goods})
    return data
}
export const fetchGoodItem = async()=>{
    const {data} = await $isAuth.get('/goods')
    return data
}
export const createBuyListItem = async(buyerUserName,sellUserName,id,nameGoodsItem,status)=>{
    const {data} = await $isAuth.post('/buyListItem',{buyerUserName,sellUserName,id,nameGoodsItem,status})
    return data
}