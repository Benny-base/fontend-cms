import { observable, action, makeAutoObservable } from "mobx";
import request from '@/utils/request'

class Enumerate {
    
    constructor(){
        makeAutoObservable(this)
    }

    @action
    getList = (data) => {
        return request.post('/api/v1/emun/emunList', data)
    }

    // @action
    // addMenu = (data) => {
    //     return request.post('/api/v1/menus/addMenu', data)
    // }

}

export default new Enumerate();