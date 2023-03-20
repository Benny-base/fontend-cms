import { observable, action, makeAutoObservable } from "mobx";
import request from '@/utils/request'
import { saveSetting } from '@/utils'

class Role {
    
    constructor(){
        makeAutoObservable(this)
    }

    @action
    getList = (data) => {
        return request.post('/api/v1/role/roleList', data)
    }

    @action
    addRole = (data) => {
        return request.post('/api/v1/role/addRole', data)
    }

}

export default new Role();