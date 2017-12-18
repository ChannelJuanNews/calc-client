import { EventEmitter } from "events"
import Hashes from 'jshashes'
import dispatcher from "../dispatcher"


const HomeTab = {
    title   : "Home",
    hash    : "Home"
}

const AddTab = {
    title   : "Add",
    hash    : "Add"
}


class TabStore extends EventEmitter {
    constructor(){
        super()
        this.tabs = [HomeTab, AddTab]
    }

    addTab(title){
        let newTab = {
            title : title,
            hash  : new Hashes.SHA256().b64( (new Date).getTime() + title).split("/").join(""),
            isNew : true
        }
        this.tabs.pop()
        this.tabs.push(newTab)
        this.tabs.push(AddTab)
        this.emit("change")
    }
    deleteTab(hash){

    }
    focusOnTab(hash){
        this.emit('focusontab', hash)
    }

    getTab(hash){
        for(let i = 0; i < this.tabs.length; i++){
            if (this.tabs[i].hash === hash){
                return this.tabs[i]
            }
        }
    }

    handleActions(action){
        switch (action.type) {
            case "ADD_TAB":
                this.addTab(action.title)
                break;
            case "DELETE_TAB":
                this.deleteTab(action.hash)
                break;
            case "FOCUS_ON_TAB":
                this.focusOnTab(action.hash)
                break
            default:
                console.log("This action not supported")

        }
    }
    getAll(){
        return this.tabs
    }
}



const tabStore = new TabStore()
dispatcher.register(tabStore.handleActions.bind(tabStore))
export default tabStore
