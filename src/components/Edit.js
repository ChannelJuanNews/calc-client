import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

import * as TabActions from "../actions/TabActions"
import TabStore from '../stores/TabStore'

import {
    Tabs,
    Tab,
    FontIcon,
    Checkbox,
    RaisedButton,
    TextField,
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
}  from 'material-ui'

import { MuiThemeProvider, getMuiTheme }from 'material-ui/styles'
import Icons from "./Icons"

import peakPriceHelper from "../Helper/peakPrice"



const muiTheme = getMuiTheme({
  appBar: {
    height: 70,
  },
  block : {
    maxWidth : 250
  },
  checkbox : {
    marginBottom : 16
  }
})


// objectives
const GOGREEN     = 'gogreen'
const MICROGRID   = 'microgrid'
const LOWERBILL   = 'lowerbill'
const OFFGRID     = 'offgrid'
const BACKUPPOWER = 'backuppower'
const PEAKSHAVING = 'peakshaving'

// existitng technology
const GENERATOR = 'generator'
const SOLAR     = 'solar'
const BATTERIES = 'batteries'
const NOTECH    = 'notech'


class Edit extends Component {


    constructor(props){
        super(props)
        this.state = {
            tab             : TabStore.getTab(this.props.hash),
            hash            : this.props.hash
        }
        this.checkboxes = {}
    }

    componentDidUpdate(){

      // when the parent component (TabView) updates, so does this component
      // we need to make sure the user is still on the same tab, otherwise we need to
      // set the state variables with the correct values of the current tab/hash

      let hash = window.location.href.split('/')[window.location.href.split('/').length - 1]

      if (this.state.tab.hash === hash){
        return TabActions.saveTab(this.state.tab) // saving the tab
      }

      // otherwise, we have a different tab, so set the state to reflect the
      // different tab data/state

      this.setState({
        tab   : TabStore.getTab(hash),
        hash  : hash
      })

    }



    // OBJECTIVES ==============================================================
    setObjectives(objective){

      let tempTab   = Object.assign({}, this.state.tab)
      let index     = this.state.tab.data.objectives.indexOf(objective)

      if (index !== -1){
        // element exists in array, so remove it
        tempTab.data.objectives.splice(index, 1)
      }
      else {
        tempTab.data.objectives.push(objective)
      }

      this.setState({
        tab : tempTab
      })

    }


    getObjectives(){
        return(
            <MuiThemeProvider muiTheme={muiTheme}>
              <div className="animated zoomIn">

                <br />
                <div className="center">
                  <h1>What are your Objectives?</h1>
                </div>

                <br />

                <div className="frame">
                  <div className="bit-100">
                    <Checkbox label="Go green" checked={ ( () => {if (this.state.tab.data.objectives.indexOf(GOGREEN) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(GOGREEN)} }  />
                  </div>
                  <div className="bit-100">
                    <Checkbox label="I want a micro grid" checked={ ( () => {if (this.state.tab.data.objectives.indexOf(MICROGRID) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(MICROGRID)} } />
                  </div>
                  <div className="bit-100">
                    <Checkbox label="I want to lower my bill" checked={ ( () => {if (this.state.tab.data.objectives.indexOf(LOWERBILL) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(LOWERBILL)} } />
                  </div>
                  <div className="bit-100">
                    <Checkbox label="I want to go offgrid" checked={ ( () => {if (this.state.tab.data.objectives.indexOf(OFFGRID) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(OFFGRID)} } />
                  </div>
                  <div className="bit-100">
                    <Checkbox label="I need backup power"  checked={ ( () => {if (this.state.tab.data.objectives.indexOf(BACKUPPOWER) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(BACKUPPOWER)} } />
                  </div>
                  <div className="bit-100">
                    <Checkbox label="Peak shaving" checked={ ( () => {if (this.state.tab.data.objectives.indexOf(PEAKSHAVING) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(PEAKSHAVING)} } />
                  </div>
                </div>
                <br />
                <div className="center">
                  <RaisedButton className="center blue-button" label="Next" primary={true} onClick={ () => {

                    /*
                    this.state.tab.isNew = false
                    this.state.tab.objectivesDone = true;

                    this.setState({
                      objectivesDone : true
                    })
                    */
                    if (this.state.tab.data.objectives.length === 0 ){
                      return alert("You must select at least one")
                    }

                    let tempTab = Object.assign({}, this.state.tab)
                    tempTab.isNew = false
                    tempTab.objectivesDone = true
                    this.setState({
                      tab : tempTab
                    })

                  } } />
                </div>


              </div>
            </MuiThemeProvider>
        )
    }

    // EXISTING TECH ===========================================================
    setExistingTech(tech){

      // if the input was "None of the above", we want to emptu
      // out the array
      let tempTab = Object.assign({}, this.state.tab)

      if (tech === NOTECH){
        if (tempTab.data.existingTech.length === 1 &&  tempTab.data.existingTech[0] === NOTECH){
            return null // do nothing since we already have nothing inside of the array
        }
        // if we get here we assume we have tech to delete from the array
        while(tempTab.data.existingTech.length > 0){
            tempTab.data.existingTech.pop() // delete all the other existing tech
        }
        tempTab.data.existingTech.push(NOTECH) // put the no tech on there
      }
      else {

          // we want to first check to see if we still have a NOTECH string
          // within our array. if we do, we want to delete before we append the
          // new tech
          let ind = tempTab.data.existingTech.indexOf(NOTECH)
          if (ind !== -1){
              // the element exists, so we want to get rid of the NOTECH so the
              // checkmark doesn't show because the checkmarks are mutually exclusive
              // meaning that we cannot both have no tech and some tech. either some tech or no tech
              tempTab.data.existingTech.splice(ind, 1) // this removes it from the array
          }
          let index = tempTab.data.existingTech.indexOf(tech)
          if (index !== -1) {
              // the element exists, so we want to remove it from the array
              tempTab.data.existingTech.splice(index, 1)
          }
          else {
              // the element is not in the array so we want to append to array
              tempTab.data.existingTech.push(tech)
          }
      }
      // replace tab state with new tab state
      this.setState({
          tab : tempTab
      })

    }

    getExistingTech(){
      return(
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="animated zoomIn">
            <br />
            <div className="center">
              <h1>Do you have any of the following on site?</h1>
            </div>
            <br />

            <div className="frame">
              <div className="bit-100">
                <Checkbox label="Generator"  checked={ ( () => {if (this.state.tab.data.existingTech.indexOf(GENERATOR) === -1){return false}; return true} )() } onCheck={ () => {console.log("THERE IS A CHECK"); this.setExistingTech(GENERATOR) } } />
              </div>
              <div className="bit-100">
                <Checkbox label="Solar panels" checked={ ( () => {if (this.state.tab.data.existingTech.indexOf(SOLAR) === -1){return false}; return true} )() } onCheck={ () => {this.setExistingTech(SOLAR) } } />
              </div>
              <div className="bit-100">
                <Checkbox label="Batteries"  checked={ ( () => {if (this.state.tab.data.existingTech.indexOf(BATTERIES) === -1){return false}; return true} )() } onCheck={ () => {this.setExistingTech(BATTERIES) } } />
              </div>
              <div className="bit-100">
                <Checkbox label="None of the above" checked={ ( () => {if (this.state.tab.data.existingTech.indexOf(NOTECH) === -1){return false}; return true} )() }  onCheck={ () => {this.setExistingTech(NOTECH) } } />
              </div>
            </div>

            <br />

            <div className="center">
              <RaisedButton className="center blue-button" label="Next" primary={true} onClick={ () => {
                  console.log('this is where we would go from next')

                  if (this.state.tab.data.existingTech.length === 0){
                      return alert("Please check at least one")
                  }

                  let tempTab = Object.assign({}, this.state.tab)
                  tempTab.existingTechDone = true
                  this.setState({
                    tab : tempTab
                  })

              } } />
            </div>

          </div>
        </MuiThemeProvider>
      )
    }

    // Peak data entry =========================================================
    setPeaks(event, text) {



      let tempTab = Object.assign({}, this.state.tab)

      if (event.target.id === "on-peak-rate-input"){
        peakPriceHelper(this, event, text, tempTab, 'onPeak')
      }
      else if(event.target.id === "off-peak-rate-input"){
        peakPriceHelper(this, event, text, tempTab, 'offPeak')
      }
      else if(event.target.id === "mid-peak-rate-input"){
        peakPriceHelper(this, event, text, tempTab, 'midPeak')
      }
      else if (event.currentTarget.id === "default-peaks"){
        peakPriceHelper(this, event, text, tempTab, 'defaultPeaks')
      }
      else if (event.target.id.substring(0, 4) === "time"){
        peakPriceHelper(this, event, text, tempTab, 'time')
      }
      else if (event.currentTarget.id === "default-peak-times"){
        peakPriceHelper(this, event, text, tempTab, 'defaultPeakTimes')
      }
      else {
         console.log(event.currentTarget, event.target, event.target.id)
      }
    }

    getPeakTimes(peak, time){

        if (peak === "on"){
            return (
                <div>
                    <td align="center">  <Checkbox class="checkbox" id={"time-on-"  + time}  checked={true} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-off-" + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-mid-" + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                </div>

            )
        }
        else if(peak === "off"){
            return (
                <div>
                    <td align="center">  <Checkbox id={"time-on-"  + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-off-" + time} checked={true} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-mid-" + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                </div>
            )
        }

        else if (peak === "mid"){
            return(
                <div>
                    <td align="center">  <Checkbox id={"time-on-"  + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-off-" + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-mid-" + time} checked={true} onCheck={this.setPeaks.bind(this)} /> </td>
                </div>
            )
        }
        // initialize them all to false
        else {
            return (
                <div>
                    <td align="center">  <Checkbox id={"time-on-"  + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-off-" + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                    <td align="center">  <Checkbox id={"time-mid-" + time} checked={false} onCheck={this.setPeaks.bind(this)} /> </td>
                </div>
            )
        }

    }

    getPeaks(){

        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="animated zoomIn">
                    <br />

                    <div className="center">
                        <h1>Please enter your Time-of-use Rates</h1>
                    </div>

                    <br />

                    <div className="time-of-use-container center">
                        <div className="frame">
                            <div className="bit-33">
                                <h3 className="center">
                                    On Peak
                                </h3>
                                <hr />
                                <br />
                                <label className="center">On Peak Rate ($/kWh)</label>
                                <div className="on-peak-rate peak-rate center">
                                  <TextField id="on-peak-rate-input" value={  this.state.tab.data.peakData.onPeakPrice  }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)} style={{ textColor : "red"}}/>
                                </div>

                            </div>
                            <div className="bit-33">
                                <h3 className="center">
                                    Off Peak
                                </h3>
                                <hr />
                                <br />
                                <label className="center">Off Peak Rate ($/kWh)</label>
                                <div className="off-peak-rate peak-rate center">
                                    <TextField id="off-peak-rate-input" value={  this.state.tab.data.peakData.offPeakPrice  }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)}/>
                                </div>
                            </div>
                            <div className="bit-33">
                                <h3 className="center">
                                    Mid Peak
                                </h3>
                                <hr />
                                <br />
                                <label className="center">Mid Peak Rate ($/kWh)</label>
                                <div className="mid-peak-rate peak-rate center">
                                    <TextField id="mid-peak-rate-input" value={  this.state.tab.data.peakData.midPeakPrice  }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="default-buttons-container">
                      <div className="center">
                        <RaisedButton className="blue-button" id="default-peaks" label="Use Defaults" primary={true} onClick={this.setPeaks.bind(this)}/>
                      </div>
                    </div>

                    <br />

                    <div className="peak-times-container">

                        <div className="peak-times-table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th> Time </th>
                                        <th id="th-1"> On Peak </th>
                                        <th id="th-2"> Off Peak </th>
                                        <th id="th-3"> Mid Peak </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <br />
                                    <tr>
                                        <td align="center"> 1 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.oneAM, "oneAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 2 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.twoAM, "twoAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 3 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.threeAM, "threeAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 4 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.fourAM, "fourAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 5 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.fiveAM, "fiveAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 6 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.sixAM, "sixAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 7 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.sevenAM, "sevenAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 8 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.eightAM, "eightAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 9 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.nineAM, "nineAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 10 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.tenAM, "tenAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 11 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.elevenAM, "elevenAM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 12 P.M. (Noon) </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.twelvePM, "twelvePM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 1 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.onePM, "onePM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 2 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.twoPM, "twoPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 3 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.threePM, "threePM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 4 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.fourPM, "fourPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 5 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.fivePM, "fivePM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 6 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.sixPM, "sixPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 7 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.sevenPM, "sevenPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 8 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.eightPM, "eightPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 9 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.ninePM, "ninePM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 10 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.tenPM, "tenPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 11 P.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.elevenPM, "elevenPM").props.children }
                                    </tr>
                                    <tr>
                                        <td align="center"> 12 A.M. </td>
                                        { this.getPeakTimes(this.state.tab.data.peakData.peaks.twelveAM, "twelveAM").props.children }
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <br />
                    <div className="center default-peak-times-container">
                        <RaisedButton className="blue-button" id="default-peak-times" label="Use Defaults" primary={true} onClick={this.setPeaks.bind(this)} />
                    </div>
                    <br />
                    <br />
                    <div className="center next-button-container">
                        <RaisedButton className="blue-button" id="next-button-container" label="Next" primary={true} onClick={ () => {
                            let tempTab = Object.assign({}, this.state.tab)
                            if (

                                tempTab.data.peakData.peaks.oneAM !== null &&
                                tempTab.data.peakData.peaks.twoAM !== null &&
                                tempTab.data.peakData.peaks.threeAM !== null &&
                                tempTab.data.peakData.peaks.fourAM !== null &&
                                tempTab.data.peakData.peaks.fiveAM !== null &&
                                tempTab.data.peakData.peaks.sixAM !== null &&
                                tempTab.data.peakData.peaks.sevenAM !== null &&
                                tempTab.data.peakData.peaks.eightAM !== null &&
                                tempTab.data.peakData.peaks.nineAM !== null &&
                                tempTab.data.peakData.peaks.tenAM !== null &&
                                tempTab.data.peakData.peaks.elevenAM !== null &&
                                tempTab.data.peakData.peaks.twelvePM !== null &&
                                tempTab.data.peakData.peaks.onePM !== null &&
                                tempTab.data.peakData.peaks.twoPM !== null &&
                                tempTab.data.peakData.peaks.threePM !== null &&
                                tempTab.data.peakData.peaks.fourPM !== null &&
                                tempTab.data.peakData.peaks.fivePM !== null &&
                                tempTab.data.peakData.peaks.sixPM !== null &&
                                tempTab.data.peakData.peaks.sevenPM !== null &&
                                tempTab.data.peakData.peaks.eightPM !== null &&
                                tempTab.data.peakData.peaks.ninePM !== null &&
                                tempTab.data.peakData.peaks.tenPM !== null &&
                                tempTab.data.peakData.peaks.elevenPM !== null &&
                                tempTab.data.peakData.peaks.twelveAM !== null &&
                                tempTab.data.peakData.onPeakPrice !== "" &&
                                tempTab.data.peakData.offPeakPrice !== "" &&
                                tempTab.data.peakData.midPeakPrice !== ""
                            ) {
                                tempTab.peaksDone = true
                                return this.setState({
                                    tab : tempTab
                                })
                            }
                            else {
                                return alert("Please fill in all inputs")
                            }
                        }} />
                    </div>

                </div>
            </MuiThemeProvider>
        )

    }

    setLoadData(){

    }
    getLoadData(){
        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div class="load-data-container">

                </div>
            </MuiThemeProvider>
        )
    }



    // SAVE OR DELETE TAB ======================================================
    discardTab(){

    }

    saveTabToServer(){

    }


    render(){

      // make sure the tab tab exists
      if (!this.state.tab){
        return null
      }
      if (this.state.tab.isNew){
          return this.getObjectives()
      }
      else if (this.state.tab.objectivesDone && !this.state.tab.existingTechDone){
        return this.getExistingTech()
      }
      else if (this.state.tab.existingTechDone && !this.state.tab.peaksDone){
        return this.getPeaks()
      }
      else if (this.state.tab.peaksDone && !this.state.tab.constraintsDone){
          return this.getLoadData()
      }


        return (
            <h1>  This is the edit view {this.props.hash} {this.state.tab.isNew.toString()}</h1>
        )
    }
}


export default Edit
