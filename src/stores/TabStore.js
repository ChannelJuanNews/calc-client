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
            title           : title,
            hash            : new Hashes.SHA256().b64( (new Date).getTime() + title + Math.random()).split("/").join("").split("=").join(""),
            isNew               : true,
            isCompleted         : false,
            objectivesDone      : false,
            existingTechDone    : false,
            peaksDone           : false,
            loadProfileDone     : false,
            constraintsDone     : false,
            data            : {
              objectives    : [],
              existingTech  : [],
              peakData : {
                onPeak : {
                  lowerBound : null,
                  upperBound : null,
                  price      : null,
                },
                midPeak : {
                  lowerBound : null,
                  upperBound : null,
                  price : null
                },
                offPeak : null,
                lowerBound : null,
                upperBound : null,
                price : null
              },
              loadProfile : {},
              additionalConstraints : {
                costConstraint      : null, // sum(costConstraint) <= x
                solarSizeConstraint : null, // solar.power <= x
                gridSizeConstraint  : {     // x <= grid.power <= y
                  lowerBound : null,
                  upperBound : null,
                },
                generatorSizeConstraint : null, // gen.power <= x
                batterySizeConstraint   : null, // battery.energy <= x
                chargeFromSolar         : null, // battery.power <= pv.power
              }
            }
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

    saveTab(tab){

      for (let i = 0; i < this.tabs.length; i++){
        if (this.tabs[i].hash === tab.hash){

          this.tabs[i] = tab
          return console.log('new tab is ====> ', this.tabs[i])
        }
      }
      console.error('This tab does not exist, cannot save')
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
            case "SAVE_TAB":
                this.saveTab(action.tab)
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
window.TabStore = tabStore
dispatcher.register(tabStore.handleActions.bind(tabStore))
export default tabStore
