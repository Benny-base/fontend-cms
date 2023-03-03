import { observable, action, makeAutoObservable } from "mobx";
import request from '@/utils/request'

class User {

    @observable token = ''
    @observable info = {}
    
    constructor(){
        makeAutoObservable(this)
    }

    setToken = (token) => {
        this.token = token
    }

    setInfo = (info) => {
        this.info = info
    }

    @action
    signIn = (data) => {
        return request.post('/api/v1/user/signIn', data)
    }

    @action
    addManager = (data) => {
        return request.post('/api/v1/user/addManager', data)
    }
}

export default new User();