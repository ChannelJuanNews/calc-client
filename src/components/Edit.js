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
    TableRowColumn,
    Step,
    Stepper,
    StepButton,
    StepLabel
}  from 'material-ui'

import { MuiThemeProvider, getMuiTheme }from 'material-ui/styles'
import Icons from "./Icons"
import ReactDataSheet from 'react-datasheet';

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
    setExistingTech(tech, text){



        if (tech.target){
            if (tech.target.id === "existing-generator-input"){
                console.log(text)
            }
        }

      // if the input was "None of the above", we want to emptu
      // out the array
      let tempTab = Object.assign({}, this.state.tab)


      if (tech === NOTECH){

          tempTab.data.existingTech.generator.exists = false,
          tempTab.data.existingTech.solar.exists = false,
          tempTab.data.existingTech.battery.exists = false,
          tempTab.data.existingTech.none = true

      }
      else {
          // we want to set the no tech flag to false if we do have tech
          if (tempTab.data.existingTech.none){
              tempTab.data.existingTech.none = false
          }

          if (tech === GENERATOR){
              tempTab.data.existingTech.generator.exists = !tempTab.data.existingTech.generator.exists
          }
          else if(tech === SOLAR){
              tempTab.data.existingTech.solar.exists = !tempTab.data.existingTech.solar.exists
          }
          else if (tech === BATTERIES){
              tempTab.data.existingTech.battery.exists = !tempTab.data.existingTech.battery.exists
          }
      }
      // replace tab state with new tab state
      this.setState({
          tab : tempTab
      })

    }

    getExistingTechContent(){
        if (this.state.tab.data.existingTech.step === 0){
            return (

                    <div className="frame">
                      <div className="bit-100">
                        <Checkbox label="Generator"  checked={ this.state.tab.data.existingTech.generator.exists } onCheck={ () => {console.log("THERE IS A CHECK"); this.setExistingTech(GENERATOR) } } />
                      </div>
                      <div className="bit-100">
                        <Checkbox label="Solar panel" checked={ this.state.tab.data.existingTech.solar.exists }  onCheck={ () => {this.setExistingTech(SOLAR) } } />
                      </div>
                      <div className="bit-100">
                        <Checkbox label="Battery"  checked={ this.state.tab.data.existingTech.battery.exists } onCheck={ () => {this.setExistingTech(BATTERIES) } } />
                      </div>
                      <div className="bit-100">
                        <Checkbox label="None of the above" checked={ this.state.tab.data.existingTech.none }  onCheck={ () => {this.setExistingTech(NOTECH) } } />
                      </div>
                    </div>


            )
        }
        else if (this.state.tab.data.existingTech.step === 1){

            let inputs = []

            if(this.state.tab.data.existingTech.generator.exists){
                inputs.push(

                    <div className="box">
                        <label className="center">Input Generator Size (kW)</label>
                        <div className="center peak-rate">
                            <TextField  className="center" id="existing-generator-input" value={this.state.tab.data.existingTech.generator.size} onChange={this.setExistingTech.bind(this)}/>
                        </div>
                    </div>
                )
            }

            if (this.state.tab.data.existingTech.solar.exists){
                inputs.push(
                    <div className="box">
                        <label className="center">Input Solar Location (Zip Code)</label>
                        <div className="center peak-rate">
                            <TextField id="existing-solar-input-zip" value={this.state.tab.data.existingTech.solar.location} onChange={this.setExistingTech.bind(this)}/>
                        </div>

                        <label className="center">Input Solar Size (kW)</label>
                        <div className="center peak-rate">
                            <TextField id="existing-solar-input-size" value={this.state.tab.data.existingTech.solar.power} onChange={this.setExistingTech.bind(this)}/>
                        </div>
                    </div>
                )
            }

            if (this.state.tab.data.existingTech.battery.exists){
                inputs.push(
                    <div className="box">
                        <label className="center">Input Battery Power (kW) </label>
                        <div className="center">
                            <TextField id="existing-battery-input-power" value={this.state.tab.data.existingTech.battery.power} onChange={this.setExistingTech.bind(this)}/>
                        </div>
                        <label className="center">Input Battery Energy (kW) </label>
                        <div className="center">
                            <TextField id="existing-battery-input-energy" value={this.state.tab.data.existingTech.battery.energy} onChange={this.setExistingTech.bind(this)}/>
                        </div>
                    </div>
                )
            }

            return(
            <div className="existing-tech-inputs-container">
                {
                    inputs.map( (textfields) => {
                        return textfields
                    })
                }
            </div>

            )
        }
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

            <div className="stepper-container-2">
                <Stepper activeStep={this.state.tab.data.existingTech.step}>
                    <Step>
                        <StepLabel> Select Existing</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel> Input Existing Details</StepLabel>
                    </Step>
                </Stepper>
            </div>


            {this.getExistingTechContent()}


            <br />

            <div className="center">
              <RaisedButton className="center blue-button" label="Next" primary={true} onClick={ () => {

                  if (this.state.tab.data.existingTech.none === false && this.state.tab.data.existingTech.generator.exists === false && this.state.tab.data.existingTech.solar.exists === false && this.state.tab.data.existingTech.battery === false){
                      return alert('Please select at least one')
                  }

                  if (this.state.tab.data.existingTech.none === true){

                      let tempTab = Object.assign({}, this.state.tab)
                      tempTab.existingTechDone = true
                      this.setState({
                        tab : tempTab
                      })
                  }
                  else if (this.state.tab.data.existingTech.step === 1){
                      // validate the inputs
                      if (this.state.tab.data.existingTech.generator.exists){
                          if (this.state.tab.data.existingTech.generator.size === ""){
                              return alert("Please fill in all inputs")
                          }
                      }
                      if (this.state.tab.data.existingTech.solar.exists){
                          if (this.state.tab.existingTech.solar.location === "" || this.state.tab.existingTech.solar.power === ""){
                              return alert("Please fill in all inputs")
                          }
                      }
                      if(this.state.tabdata.existingTech.battery.exists){
                          if(this.state.tab.data.existingTech.battery.power === "" || this.state.tab.existingTech.battery.energy === ""){
                              return alert("Please fill in all inputs")
                          }
                      }

                      // if we made it here, we are good to go
                      let tempTab = Object.assign({}, this.state.tab)
                      tempTab.data.existingTechDone = true
                      return this.setState({
                          tab : tempTab
                      })

                  }
                  else {
                      let tempTab = Object.assign({}, this.state.tab)
                      tempTab.data.existingTech.step ++
                      return this.setState({
                          tab : tempTab
                      })
                  }

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
      else if (event.targe.id === "demand-input-on-peak"){

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
                        <h1>Enter Your Energy Charge Rates</h1>
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
                                <label className="center">Energy Rate</label>
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
                                <label className="center"> Energy Rate</label>
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
                                <label className="center"> Energy Rate</label>
                                <div className="mid-peak-rate peak-rate center">
                                    <TextField id="mid-peak-rate-input" value={  this.state.tab.data.peakData.midPeakPrice  }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="default-buttons-container">
                      <div className="center">
                        <RaisedButton className="blue-button" id="default-peaks" label="Use Defaults" primary={true} onClick={this.setPeaks.bind(this)}/>
                      </div>
                    </div>

                    <br />


                    <div className="demand-charge-container">
                      <div className="center">
                        <h1>
                          Please Enter Your Demand Charge Rates
                        </h1>
                      </div>
                      <br />
                      <div className="demand-charge-rates-container">
                        <div className="frame">
                          <div className="bit-33">
                            <h3 className="center">
                                On Peak
                            </h3>
                            <hr />
                            <br />
                            <label className="center">Demand Rate ($/kWh)</label>
                            <div className="center">
                              <TextField id="demand-input-on-peak peak-rate" value={this.state.tab.data.peakData.demandOnPeakPrice} hintText="e.g. $12.89" onChange={this.setPeaks.bind(this)} />
                            </div>
                          </div>
                          <div className="bit-33">
                            <h3 className="center">
                                On Peak
                            </h3>
                            <hr />
                            <br />
                            <label className="center">Demand Rate ($/kWh)</label>
                            <div className="center">
                              <TextField id="demand-input-off-peak peak-rate" value={this.state.tab.data.peakData.demandOnPeakPrice} hintText="e.g. $12.89" onChange={this.setPeaks.bind(this)} />
                            </div>
                          </div>

                          <div className="bit-33">
                            <h3 className="center">
                                On Peak
                            </h3>
                            <hr />
                            <br />
                            <label className="center">Demand Rate ($/kWh)</label>
                            <div className="center">
                              <TextField id="demand-input-mid-peak peak-rate" value={this.state.tab.data.peakData.demandOnPeakPrice} hintText="e.g. $12.89" onChange={this.setPeaks.bind(this)} />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>


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
                <div className="load-data-container">
                    <br />
                    <div className="center">
                        <h1> Please enter your load profile</h1>
                    </div>
                    <br />

                    <ReactDataSheet
                        data={this.state.tab.data.loadProfile.grid}
                        valueRenderer={ (cell) => cell.value }
                        onChange= {(cell, rowI, colJ, value) => {
                            let tempTab = Object.assign({}, this.state.tab)
                            for (let i = 0; i < tempTab.data.loadProfile.grid.length; i++){
                                if(tempTab.data.loadProfile.grid[rowI][colJ] !== value){
                                    tempTab.data.loadProfile.grid[rowI][colJ].value = value
                                }

                            }
                            return this.setState({
                                tab : tempTab
                            })
                        }}
                     />
                     <br />



                     <div className="center">

                         <input
                             id="file-upload"
                             type="file"
                             style={{display : "none"}}
                             accept=".xlsx, .xls, .csv"
                             onChange={ (event, stuff) => {
                                 window.TEST = event.target

                                 // we have a file
                                 if(event.target.files.length !== 0){


                                     let tempTab = Object.assign({}, this.state.tab)

                                     // TODO: need to implement actual reading of .csv, .xlsx, .xls files and populate the grid with it

                                     for (let i = 0; i < tempTab.data.loadProfile.grid.length - 1; i++){
                                         for (let j = 1; j < tempTab.data.loadProfile.grid[i].length; j++){
                                             tempTab.data.loadProfile.grid[i][j].value =  Math.floor(Math.random() * 10) +  Math.floor(Math.random() * 10) +  Math.floor(Math.random() * 10)
                                         }
                                     }

                                     return this.setState({
                                         tab : tempTab
                                     })

                                 }
                             }}
                         />

                         <RaisedButton className="blue-button" label="Default Load Data" primary={true} onClick={()=>{
                             let tempTab = Object.assign({}, this.state.tab)

                             // TODO: need to implement default load data

                             for (let i = 0; i < tempTab.data.loadProfile.grid.length - 1; i++){
                                 for (let j = 1; j < tempTab.data.loadProfile.grid[i].length; j++){
                                     tempTab.data.loadProfile.grid[i][j].value =  Math.floor(Math.random() * 10) +  Math.floor(Math.random() * 10) +  Math.floor(Math.random() * 10)
                                 }
                             }

                             return this.setState({
                                 tab : tempTab
                             })
                         }}/>
                         <span className="or">
                             <b> OR </b>
                         </span>
                         <RaisedButton className="blue-button" label="Upload Load Data" primary={true} onClick={()=>{
                             let upload = document.getElementById('file-upload')
                             upload.click()
                         }}/>

                     </div>

                     <br />
                     <div className="center">
                         <RaisedButton className="blue-button" label="Next" primary={true} onClick={()=>{
                             let tempTab = Object.assign({}, this.state.tab)
                             tempTab.loadProfileDone = true
                             return this.setState({
                                 tab : tempTab
                             })

                         }}/>
                     </div>

                </div>
            </MuiThemeProvider>
        )
    }

    setAdditionalConstraints(event){
        console.log(event.target)

        let tempTab = Object.assign({}, this.state.tab)

        if (event.target.id === "cost-constraint"){
            if (tempTab.data.additionalConstraints.costConstraint.checked){
                tempTab.data.additionalConstraints.costConstraint.checked = false
                return this.setState({
                    tab : tempTab
                })
            }
            tempTab.data.additionalConstraints.costConstraint.checked = true
        }
        else if (event.target.id === "solar-size-constraint"){
            if (tempTab.data.additionalConstraints.solarSizeConstraint.checked){
                tempTab.data.additionalConstraints.solarSizeConstraint.checked = false
                return this.setState({
                    tab : tempTab
                })
            }
            tempTab.data.additionalConstraints.solarSizeConstraint.checked = true
        }
        else if (event.target.id === "grid-size-constraint"){
            if (tempTab.data.additionalConstraints.gridSizeConstraint.checked){
                tempTab.data.additionalConstraints.gridSizeConstraint.checked = false
                return this.setState({
                    tab : tempTab
                })
            }
            tempTab.data.additionalConstraints.gridSizeConstraint.checked = true
        }

        else if(event.target.id === "generator-size-constraint"){
            if (tempTab.data.additionalConstraints.generatorSizeConstraint.checked){
                tempTab.data.additionalConstraints.generatorSizeConstraint.checked = false
                this.setState({
                    tab : tempTab
                })
            }
            tempTab.data.additionalConstraints.generatorSizeConstraint.checked = true
        }
        else if (event.target.id === "battery-size-constraint"){
            if(tempTab.data.additionalConstraints.batterySizeConstraint.checked){
                tempTab.data.additionalConstraints.batterySizeConstraint.checked = false
                return this.setState({
                    tab : tempTab
                })
            }
            tempTab.data.additionalConstraints.batterySizeConstraint.checked = true
        }
        else if(event.target.id === "charge-from-solar"){
            if (tempTab.data.additionalConstraints.chargeFromSolar.checked){
                tempTab.data.additionalConstraints.chargeFromSolar.checked = false
                return this.setState({
                    tab : tempTab
                })
            }
            tempTab.data.additionalConstraints.chargeFromSolar.checked = true
        }
        else if (event.target.id === "no-constraints"){
          tempTab.data.additionalConstraints.costConstraint.checked = false
          tempTab.data.additionalConstraints.solarSizeConstraint.checked = false
          tempTab.data.additionalConstraints.gridSizeConstraint.checked = false
          tempTab.data.additionalConstraints.generatorSizeConstraint.checked = false
          tempTab.data.additionalConstraints.batterySizeConstraint.checked = false
          tempTab.data.additionalConstraints.chargeFromSolar.checked = false
          tempTab.data.additionalConstraints.noConstraints.checked = true

          return this.setState({
            tab : tempTab
          })

        }
        tempTab.data.additionalConstraints.noConstraints.checked = false
        return this.setState({
            tab : tempTab
        })
    }

    getSteps(){
        if (this.state.tab.data.additionalConstraints.step === 0){
            return(
                <div className="stepper-content">
                    <Checkbox id="cost-constraint"  label="Cost Constraint" checked={this.state.tab.data.additionalConstraints.costConstraint.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                    <Checkbox id="solar-size-constraint"  label="Solar Size Constraint" checked={this.state.tab.data.additionalConstraints.solarSizeConstraint.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                    <Checkbox id="grid-size-constraint"  label="Grid Size Constraint" checked={this.state.tab.data.additionalConstraints.gridSizeConstraint.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                    <Checkbox id="generator-size-constraint"  label="Generator Size Constraint" checked={this.state.tab.data.additionalConstraints.generatorSizeConstraint.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                    <Checkbox id="battery-size-constraint"  label="Battery Size Constraint" checked={this.state.tab.data.additionalConstraints.batterySizeConstraint.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                    <Checkbox id="charge-from-solar"  label="Charge From Solar" checked={this.state.tab.data.additionalConstraints.chargeFromSolar.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                    <Checkbox id="no-constraints"  label="No Constraints" checked={this.state.tab.data.additionalConstraints.noConstraints.checked} onCheck={this.setAdditionalConstraints.bind(this)}/>
                </div>
            )
        }
        else if (this.state.tab.data.additionalConstraints.step === 1){
            return(
                <div className="stepper-content">

                </div>
            )
        }
        else if (this.state.tab.data.additionalConstraints.step === 2){
            return(
                <div className="stepper-content">

                </div>
            )
        }
    }
    getAdditionalConstraints(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="constraints-container">
                    <br />
                    <div className="center">
                        <h1> Additional Constraints </h1>
                    </div>
                    <div className="center">
                        <p> Do you have any of the following constraints?</p>
                    </div>
                    <br />


                    {/*we default to the first step*/}

                    <div className="stepper-container">
                        <Stepper linear={false} activeStep={this.state.tab.data.additionalConstraints.step}>
                            <Step>
                                <StepButton onClick={() => {
                                    let tempTab = Object.assign({}, this.state.tab)
                                    tempTab.data.additionalConstraints.step = 0
                                    this.setState({
                                        tab : tempTab
                                    })
                                }}>
                                    Additional Constraints
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton onClick={() => {
                                    let tempTab = Object.assign({}, this.state.tab)
                                    tempTab.data.additionalConstraints.step = 1
                                    this.setState({
                                        tab : tempTab
                                    })
                                }}>
                                    More Info
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton onClick={() => {
                                    let tempTab = Object.assign({}, this.state.tab)
                                    tempTab.data.additionalConstraints.step = 2
                                    this.setState({
                                        tab : tempTab
                                    })
                                }}>
                                    Done
                                </StepButton>
                            </Step>
                        </Stepper>
                        {this.getSteps()}
                        <div className="center">
                            <RaisedButton label="Next" primary={true} className="blue-button" onClick={() => {
                                let tempTab = Object.assign({}, this.state.tab)

                                if (tempTab.data.additionalConstraints.step < 2){
                                    tempTab.data.additionalConstraints.step++
                                }
                                else {
                                    tempTab.constraintsDone = true
                                }

                                return this.setState({
                                    tab : tempTab
                                })

                            }} />
                        </div>
                    </div>

                </div>
            </MuiThemeProvider>
        )
    }

    //
    finalizeTab(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="finalize-changes-container">
                    <br />
                    <div className="center">
                        <h1> Is Everything Correct?</h1>
                    </div>
                    <br />
                    <div className="center">
                        <p>
                            the tab data goes here
                        </p>
                    </div>
                    <br />
                    <div className="center">
                        <RaisedButton label="Finalize" primary={true} className="blue-button" onClick={() => {
                            let tempTab = Object.assign({}, this.state.tab)
                            tempTab.isCompleted = true
                            return this.setState({
                                tab : tempTab
                            })
                        }}/>
                    </div>
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
      else if (this.state.tab.peaksDone && !this.state.tab.loadProfileDone){
          return this.getLoadData()
      }
      else if (this.state.tab.loadProfileDone && !this.state.tab.constraintsDone){
          return this.getAdditionalConstraints()
      }
      else if (this.state.tab.constraintsDone && !this.state.tab.isCompleted){
          return this.finalizeTab()
      }
      return (
          <h1>  The tab is completed {this.props.hash}</h1>
      )
    }
}


export default Edit
