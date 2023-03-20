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

    @action
    getList = (data) => {
        return { 
            code: 0,
            success: true,
            data: [
                { id: 1, name: '大蛇丸1', address: '木叶', status: 1, age: 16 },
                { id: 2, name: '大蛇丸2', address: '木叶', status: 1, age: 16 },
                { id: 3, name: '大蛇丸3', address: '木叶', status: 0, age: 16 },
                { id: 4, name: '大蛇丸4', address: '木叶', status: 0, age: 16 },
            ]
        }
    }

}

export default new User();