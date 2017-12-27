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
              existingTech  : {

                  step : 0,

                  generator : {
                      exists : false,
                      size   : ""
                  },
                  solar : {
                      exists   : false,
                      location : "",
                      power    : ""
                  },
                  battery : {
                      exists : false,
                      power  : "",
                      energy : ""
                  },
                  none : false
              },
              peakData : {
                step : 0,
                onPeakPrice  : "",
                offPeakPrice : "",
                midPeakPrice : "",
                demandOnPeakPrice   : "",
                demandOffPeakPrice  : "",
                demandMidPeakPrice  : "",
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

                      [
                        {value : null, readOnly : true},
                        {value : "Sun", readOnly : true},
                        {value : "Mon", readOnly : true},
                        {value : "Tues", readOnly : true},
                        {value : "Wed", readOnly : true},
                        {value : "Thurs", readOnly : true},
                        {value : "Fri", readOnly : true},
                        {value : "Sat", readOnly : true},
                    ],
                    [ {value : 1, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 2, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 3, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 4, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 5, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 6, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 7, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 8, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 9, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 10, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 11, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 12, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 13, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 14, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 15, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 16, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 17, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 18, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 19, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 20, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 21, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 22, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 23, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 24, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 25, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 26, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 27, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 28, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 29, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 30, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 31, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 32, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 33, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 34, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 35, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 36, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 37, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 38, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 39, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 40, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 41, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 42, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 43, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 44, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 45, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 46, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 47, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 48, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 48, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 50, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 51, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 52, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 53, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 54, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 55, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 56, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 57, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 58, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 59, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 60, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 61, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 62, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 63, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 64, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 65, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 66, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 67, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 68, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 69, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 70, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 71, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 72, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 73, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 74, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 75, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 76, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 77, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 78, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 78, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 80, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 81, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 81, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 83, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 84, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 85, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 86, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 87, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 88, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 89, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 90, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 91, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 92, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 93, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 94, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 95, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}],
                    [ {value : 96, readOnly : true}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}, {value : ""}]

                  ]
              },
              additionalConstraints : {
                step : 0,
                costConstraint      : { // sum(costConstraint) <= x
                    checked : false,
                    value   : ""
                },
                solarSizeConstraint : { // solar.power <= x
                    checked : false,
                    value   : ""
                },
                gridSizeConstraint  : {
                  checked    : false,  // x <= grid.power <= y
                  lowerBound : "",
                  upperBound : "",
                },
                generatorSizeConstraint : { // gen.power <= x
                    checked : false,
                    value   : ""
                },
                batterySizeConstraint   : { // battery.energy <= x
                    checked : false,
                    value   : ""
                },
                chargeFromSolar     : { // battery.power <= pv.power
                    checked : false,
                    value : ""
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
