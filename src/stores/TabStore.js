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

const splitList = ["/", "=", "+"]

class TabStore extends EventEmitter {
    constructor(){
        super()
        this.tabs = [HomeTab, AddTab]
    }

    addTab(title){
        let newTab = {
            title           : title,
            hash            : new Hashes.SHA512().b64( (new Date).getTime() + title + Math.random()).split(/[\/=+]+/).join(""), // we use epoch time, user input title and a random match number to generate a hash with hopefully zero collissions
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
                onPeakPrice  : "",
                offPeakPrice : "",
                midPeakPrice : "",
                peaks : { // possible data entires are on, off, and mid which map to the peak types
                  twelveAM  : null,
                  oneAM     : null,
                  twoAM     : null,
                  threeAM   : null,
                  fourAM    : null,
                  fiveAM    : null,
                  sixAM     : null,
                  sevenAM   : null,
                  eightAM   : null,
                  nineAM    : null,
                  tenAM     : null,
                  elevenAM  : null,
                  twelvePM  : null,
                  onePM     : null,
                  twoPM     : null,
                  threePM   : null,
                  fourPM    : null,
                  fivePM    : null,
                  sixPM     : null,
                  sevenPM   : null,
                  eightPM   : null,
                  ninePM    : null,
                  tenPM     : null,
                  elevenPM  : null,
                }
              },
              loadProfile : {
                  file : null,
                  grid : [

                      [{value : 7, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [{value : 6, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [{value : 5, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [{value : 4, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [{value : 3, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [{value : 2, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [{value : 1, readOnly : true}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}, {value : null}],
                      [
                        {value : null, readOnly : true},
                        {value : 1, readOnly : true},
                        {value : 2, readOnly : true},
                        {value : 3, readOnly : true},
                        {value : 4, readOnly : true},
                        {value : 5, readOnly : true},
                        {value : 6, readOnly : true},
                        {value : 7, readOnly : true},
                        {value : 8, readOnly : true},
                        {value : 9, readOnly : true},
                        {value : 10, readOnly : true},
                        {value : 11, readOnly : true},
                        {value : 12, readOnly : true},
                        {value : 13, readOnly : true},
                        {value : 14, readOnly : true},
                        {value : 15, readOnly : true},
                        {value : 16, readOnly : true},
                        {value : 17, readOnly : true},
                        {value : 18, readOnly : true},
                        {value : 19, readOnly : true},
                        {value : 20, readOnly : true},
                        {value : 21, readOnly : true},
                        {value : 22, readOnly : true},
                        {value : 23, readOnly : true},
                        {value : 24, readOnly : true}
                      ],
                  ]
              },
              additionalConstraints : {
                step : 0,
                costConstraint      : { // sum(costConstraint) <= x
                    checked : false,
                    value   : null
                },
                solarSizeConstraint : { // solar.power <= x
                    checked : false,
                    value   : null
                },
                gridSizeConstraint  : {
                  checked    : false,  // x <= grid.power <= y
                  lowerBound : null,
                  upperBound : null,
                },
                generatorSizeConstraint : { // gen.power <= x
                    checked : false,
                    value   : null
                },
                batterySizeConstraint   : { // battery.energy <= x
                    checked : false,
                    value   : null
                },
                chargeFromSolar     : { // battery.power <= pv.power
                    checked : false,
                    value : null
                },
                noConstraints : {
                  checked : false
                }

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
