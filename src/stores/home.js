import { observable, action, makeAutoObservable } from "mobx";
// import request from '@/utils/request'
import loading from '@/utils/decorator'

class Home {

    @observable data = {}
    
    constructor(){
        makeAutoObservable(this)
    }

    setData = () => {
        this.data = {name:'benny'}
    }

    @loading('/home/index')
    @action
    getData = (data) => {
        return request.get('/api/v1/index/home', data)
    }


}

export default new Home();