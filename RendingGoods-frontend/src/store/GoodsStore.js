import {makeAutoObservable} from "mobx";

export default class GoodsStore{
    constructor() {
        this._goods = []
        this._goodsItem = []
        this._buyList = []
        this._buyStatus=[]
        this._currGoods ={}
        this._selectedGoods ={}
        this._selectedCost = 0
        this._selectedService ={}
        this._selectedBlockCategory ={}
        makeAutoObservable(this)
    }
    setGoods(goods){
        this._goods = goods
    }
    setGoodsItem(goodsItem){
        this._goodsItem = goodsItem
    }
    setSelectedBlockCategory(selectedBlockCategory){
        this._selectedBlockCategory = selectedBlockCategory
    }
    setServices(services){
        this._services = services
    }
    setBuyList(buyList){
        this._buyList = buyList
    }
    setBuyStatus(buyStatus){
        this._buyStatus = buyStatus
    }
    setSelectedGoods(typeGoods){
        this._selectedGoods = typeGoods
    }
    setSelectedCost(costGoods){
        this._selectedCost = costGoods
    }
    setSelectedServices(typeServices){
        this._selectedService = typeServices
    }
    setCurrGoods(currGoods){
        this._currGoods = currGoods
    }
    get goods(){
        return this._goods
    }
    get goodsItem(){
        return this._goodsItem
    }
    get buyList(){
        return this._buyList
    }
    get buyStatus(){
        return this._buyStatus
    }
    get services(){
        return this._services
    }
    get selectedGoods(){
        return this._selectedGoods
    }
    get selectedCost(){
        return this._selectedCost
    }
    get selectedServices(){
        return this._selectedService
    }
    get selectedBlockCategory(){
        return this._selectedBlockCategory
    }
    get currGoods(){
        return this._currGoods
    }
}