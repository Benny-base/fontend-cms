import { observable, action, makeAutoObservable } from "mobx";

class Loading {
    @observable models = {}
    
    constructor(){
        makeAutoObservable(this)
    }

    changeModel = (key, bool) => {
        this.models[key] = bool
    }

}

export default new Loading();