import { observable, action, makeAutoObservable, computed } from "mobx";
import request from '@/utils/request'
import { saveSetting } from '@/utils'

class User {

    @observable token = ''
    @observable info = {}
    
    constructor(){
        makeAutoObservable(this)
    }

    setToken = (token) => {
        saveSetting('token', token)
        this.token = token
    }

    setInfo = (info) => {
        this.info = info
    }

    @computed
    get isLogin() {
        return !!this.token
    }

    @action
    getUserInfo = (data) => {
        return request.post('/api/v1/user/userInfo', data)
    }

    @action
    signIn = (data) => {
        return request.post('/api/v1/user/signIn', data)
    }

}

export default new User();