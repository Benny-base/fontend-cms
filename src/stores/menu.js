import { observable, action, makeAutoObservable } from "mobx";
import request from '@/utils/request'
import { saveSetting } from '@/utils'

class Menu {
    
    constructor(){
        makeAutoObservable(this)
    }

    @action
    getList = (data) => {
        return request.post('/api/v1/menus/menusList', data)
    }

    @action
    addMenu = (data) => {
        return request.post('/api/v1/menus/addMenu', data)
    }

}

export default new Menu();