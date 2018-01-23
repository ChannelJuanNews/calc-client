import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

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
    StepLabel,
    CircularProgress,
    Toggle
}  from 'material-ui'

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import Icons from "./Icons"
import ReactDataSheet from 'react-datasheet';

import peakPriceHelper    from "../Helper/peakPrice"
import existingTechHelper from "../Helper/existingTech"


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




const LOAD_DATA = "172.2466667,177.1133333,175.6933333,180.6066667,195.0266667,193.6066667,190.8733333,192.5466667,208.5666667,204.3866667,193.66,214.2133333,236.76,243.9133333,235.3866667,236.8466667,238.96,244.84,227.5866667,219.76,233.9266667,239.4,249.0333333,254.4266667,267.54,274.02,282.1933333,283.9533333,283.2333333,289.1733333,285.3733333,286.2333333,298.5933333,302.1466667,305.1066667,292.8666667,305.5933333,305.18,303.8666667,310.04,317.64,313.4466667,310.22,313.4466667,312.1533333,313.4466667,319.2933333,317.6,321.36,319.8666667,326.08,324.0533333,311.3,315.72,308.2333333,302.8666667,303.7,304.5866667,301.44,284.6133333,274.3666667,273.0133333,263.4733333,264.0133333,264.9,248.8066667,233.8466667,210.1,211.32,218.8133333,215.48,215.7333333,213.5466667,215.2133333,217.08,209.06,213.92,215.68,211.4333333,208.5,216.0666667,212.1266667,192.9733333,186.52,190.5133333,189.5,193.68,190.32,193.06,190.3333333,188.62,185.7733333,185.9333333,188.6733333,190.1466667,184.6933333,185.32,193.94,187.3266667,191.7466667,189.1866667,191.1266667,181.2533333,184.5866667,195.22,201.9266667,204.0333333,219.1933333,233.7533333,233.9066667,231.46,240.32,259.0666667,257.52,245.72,256.2,267.6466667,273.12,276.7333333,279.6733333,293.4466667,310.86,306.6133333,305.48,306.98,310.96,307.6533333,311.3733333,320.3,309.0466667,328.6733333,326.5133333,329.1066667,323.64,316.54,313.1133333,324.4333333,324.1066667,328.8,331.1866667,328.0533333,342.6,348.7933333,335.5733333,331.7133333,338.6866667,343.1933333,340.0933333,338.6266667,334.0066667,328.3733333,321.9733333,315.6933333,290.0933333,295.5266667,296.6533333,289.66,276.8066667,270.3,261.04,259.8133333,251.5933333,238.8333333,221.0333333,232.56,238.8533333,237.8266667,237.9533333,233,240.0333333,233.86,229.7933333,230.4466667,227.1866667,228.8,218.2866667,217.2666667,215.3466667,200.7666667,193.9533333,198.22,202.18,201.1933333,196.0333333,199.3066667,197.6133333,199.0066667,193.66,193.9533333,200.8666667,203.8866667,193.4866667,185.84,188.4133333,188.8066667,189.3666667,184.48,186.08,181.14,182.5733333,188.72,200.1133333,196.5866667,227.78,244.2866667,248.0133333,238.62,247.5733333,246.7533333,259.1533333,264.8066667,269.8133333,276.62,287.0333333,293.28,285.4,283.9333333,306.8866667,313.98,307.5133333,319.72,329.9666667,331.6466667,335.26,336.8733333,343.64,350.2066667,342.46,352.1866667,351.34,327.3733333,340.28,352.22,344.2733333,355.1666667,346.6533333,360.36,356.5133333,349.3733333,353.0866667,352.7066667,348.5533333,346.26,343,341.4866667,337.98,336.0533333,314.0266667,318.1066667,319.5733333,307.5333333,299.5133333,288.1266667,280.54,276.0866667,271.5733333,290.66,271.54,257.8066667,231.78,238.1066667,242.1933333,243.8266667,236.9666667,243.32,238.2866667,231.4866667,231.6933333,225.0133333,223.44,220.56,218.7,218.82,218.8533333,218.3666667,200.84,198.7266667,205.7866667,202.8533333,201.0133333,200.6933333,198.3266667,193.16,197.5933333,195.4133333,199.2066667,195.5666667,189.6733333,188.3,190.3466667,191.6,191.2866667,190,191.62,189.4733333,193.02,194.8866667,201.0466667,204.7666667,226.72,241.38,248.8,244.0466667,252.9533333,261.3933333,266.0733333,267.7666667,270.4733333,281.1066667,288.7133333,291.7866667,294.74,302.3733333,305.16,309.5733333,307.06,317.72,329.94,309.7066667,319.6,321.8266667,328.46,330.6466667,333.0333333,331.9,321.8666667,320.4266667,320.9066667,323.4066667,322.38,325.6666667,318.28,318.8133333,334.7333333,328.4133333,333.0266667,329.6933333,332.2666667,327.7066667,311.7333333,306.8466667,311.7333333,311.4866667,305.0666667,293.0733333,294.9333333,281.3533333,267.8,254.6466667,248.36,248.0333333,239.6466667,241.0733333,232.8266667,230.2533333,201.4333333,194.84,205.6933333,208.8133333,206.26,209.46,232.04,225.7466667,230.68,224.0666667,220.88,217.14,211.98,211.8533333,213.2266667,213.22,198.1333333,198.82,202.9866667,200.1933333,200.72,195.98,197.6,193.9733333,193.2266667,197.48,194.3066667,193.3466667,196.8066667,190.1733333,191.2866667,191.9066667,192.18,192.26,193.98,191.96,191.7666667,197.62,200.2066667,203.5933333,225.34,248.4933333,240.22,234.6533333,235.9733333,242.98,244.32,249,257.38,261.48,271.1066667,268.7866667,273.9733333,282.7,291.4466667,293.0733333,294.88,294.4733333,291.3933333,298.2266667,301.0666667,301.4266667,299.42,302.8066667,300.8266667,310.3533333,304.9733333,306.1866667,308.5733333,303.22,305.5866667,301.5,302.18,302.4466667,310.6266667,314.2133333,313.54,306.7466667,309.2333333,308.44,310.34,305.3333333,298.76,296.08,287.24,282.46,281.7066667,273.9266667,259.14,241.8666667,240.7933333,240.36,230.9466667,230.4866667,215.58,207.96,193.0266667,208.8733333,197.1733333,194.4,190.62,189.78,188.5733333,187.4866667,186.8066667,182.5466667,176.08,171.8866667,172.1866667,171.7933333,170.72,157.56,155.7333333,152.9066667,145.4066667,147.0933333,187.0133333,189.2133333,189.24,186.56,188.9466667,187.4866667,189.1333333,189.5866667,185.9666667,185.5933333,183.78,186.1933333,186.98,190.1466667,192.42,190.8466667,195.54,202.3266667,199.0466667,194.2533333,214.1666667,238.8933333,236,228.3533333,229.42,224.0266667,230.0533333,230.7266667,250.9666667,258.3666667,259.08,261.9466667,265.7466667,258.68,267.7733333,276.0333333,280.14,279.9933333,287.1333333,290.76,289.8333333,290.3533333,290.1933333,287.7666667,293.7733333,290.4066667,294.9333333,293.7666667,290.0933333,294.6066667,298.84,300.7733333,305.3933333,300.0866667,305.3933333,299.8533333,296.94,300.3266667,300.6,299.4733333,299.5666667,297.1933333,290.58,286.3,284.38,289.4866667,288.9533333,279.3933333,269.1533333,255.1666667,248.84,243.2666667,236.52,232.5866667,218.6666667,211.2533333,193.7333333,196.02,194.5466667,197.1066667,192.3666667,187.6466667,188.3333333,188.62,185.4866667,196.8,191.7266667,196.4733333,196.4333333,198.8466667,198.5533333,184.7733333,180.8133333,181.8933333,179.7066667,183.48,181.3333333,180.76,181.6666667,182.0466667,176.8533333,177.06,181.64,181.54,175.36,176.3666667,175.86,172.98,173.4466667,175.1666667,171.4333333,171.8,177.6,177.6466667,177.4466667,179.6,194.32,214.5066667,217.9733333,204.5666667,216.2733333,222.7266667,226.7666667,225.54,244.1066667,238.78,236.62,233.46,236.7,259.9,263.5533333,262.08,265.6,268.6133333,259.1733333,263.52,266.66,263.6666667,267.1,274.0266667,274.8,280.0933333,291.8333333,292.78,293.7133333,293.0133333,292.9,292.4933333,300.5266667,303.0466667,310.4133333,312.9466667,312.04,309.18,312.8333333,314.3066667,301.8466667,295.14,300.5866667,297.4266667,301.0266667,299.1333333,298.9533333,285.22,273.4133333,263.8133333,244.2733333,242.6866667,244.0666667,234.12,223.0333333,217.8266667,199.42,204.7666667,199.72,201.7866667,198.2133333,192.9933333,200.38,197.72,195.7266667,215.6133333,206.9933333,203.9333333,200.1,207.36,203.3,188.3533333,187.4533333,191.88,187.12,192.6733333,180.3066667,178.0266667,176.0666667,178.5733333,176.7466667,179.14,182.7666667,180.5866667,171.6733333"






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

        // if the input was "None of the above", we want to emptu
        // out the array
        let tempTab = Object.assign({}, this.state.tab)

        // there is a target if there is a text field input
        if (tech.target){
            existingTechHelper(this, tech, text)
        }

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
                        <label className="center">Input Battery Energy (kwHr) </label>
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
                          if (this.state.tab.data.existingTech.solar.location === "" || this.state.tab.data.existingTech.solar.power === ""){
                              return alert("Please fill in all inputs")
                          }
                      }
                      if(this.state.tab.data.existingTech.battery.exists){
                          if(this.state.tab.data.existingTech.battery.power === "" || this.state.tab.data.existingTech.battery.energy === ""){
                              return alert("Please fill in all inputs")
                          }
                      }

                      // if we made it here, we are good to go
                      let tempTab = Object.assign({}, this.state.tab)
                      tempTab.existingTechDone = true
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
      else if (event.currentTarget.id === "default-demand-rates"){
          peakPriceHelper(this, event, text, tempTab, 'defaultDemandPrices')
      }
      else if (event.target.id === "demand-input-on-peak"){
          peakPriceHelper(this, event, text, tempTab, 'demandOnPeak')
      }
      else if (event.target.id === "demand-input-off-peak"){
          peakPriceHelper(this, event, text, tempTab, 'demandOffPeak')
      }
      else if (event.target.id === "demand-input-mid-peak"){
          peakPriceHelper(this, event, text, tempTab, 'demandMidPeak')
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


    getPeakStep(){

        if (this.state.tab.data.peakData.step === 0){
            return(

                <div>
                    <br />
                    <div className="center">
                        <h2>Enter Your Energy Charge Rates</h2>
                    </div>

                    <br />
                    <br />

                    <div className="energy-rate-container center">
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
                    <br />
                </div>

            )
        }

        else if (this.state.tab.data.peakData.step === 1){
            return(




                <div>
                    <br />
                    <div className="center">
                        <h2>Enter Your Demand Charge Rates</h2>
                    </div>

                    <br />
                    <br />

                    <div className="demand-rate-container center">
                        <div className="frame">
                            <div className="bit-33">
                                <h3 className="center">
                                    On Peak
                                </h3>
                                <hr />
                                <br />
                                <label className="center">Demand Rate</label>
                                <div className="on-peak-rate peak-rate center">
                                  <TextField id="demand-input-on-peak" value={  this.state.tab.data.peakData.demandOnPeakPrice  }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)} style={{ textColor : "red"}}/>
                                </div>

                            </div>
                            <div className="bit-33">
                                <h3 className="center">
                                    Off Peak
                                </h3>
                                <hr />
                                <br />
                                <label className="center"> Demand Rate</label>
                                <div className="off-peak-rate peak-rate center">
                                    <TextField id="demand-input-off-peak" value={  this.state.tab.data.peakData.demandOffPeakPrice  }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)}/>
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
                                    <TextField id="demand-input-mid-peak" value={  this.state.tab.data.peakData.demandMidPeakPrice }  hintText="e.g. $0.12" onChange={this.setPeaks.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="default-buttons-container">
                      <div className="center">
                        <RaisedButton className="blue-button" id="default-demand-rates" label="Use Defaults" primary={true} onClick={this.setPeaks.bind(this)}/>
                      </div>
                    </div>
                    <br />
                    <br />
                </div>


            )
        }

        else if (this.state.tab.data.peakData.step === 2){
            return (

                <div>
                    <h2 className="center">Select Peak Times</h2>
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
                </div>

            )
        }


    }


    getPeaks(){

        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="animated zoomIn">
                    <br />

                    <h1 className="center">
                        Enter Your Time-Of-Use Rates
                    </h1>


                    <div className="stepper-container-3">
                        <Stepper activeStep={this.state.tab.data.peakData.step}>
                            <Step>
                                <StepLabel>Enter Energy Charge Rates</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Enter Demand Charge Rates</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Select Peak Times</StepLabel>
                            </Step>
                        </Stepper>
                    </div>



                    {this.getPeakStep()}

                    <br />

                    <div className="center next-button-container">
                        <RaisedButton className="blue-button" id="next-button-container" label="Next" primary={true} onClick={ () => {



                            let tempTab = Object.assign({}, this.state.tab)

                            if (tempTab.data.peakData.step < 2){
                                tempTab.data.peakData.step++
                                return this.setState({
                                    tab : tempTab
                                })
                            }

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

    setToggle(){
      //console.log('we got toggled')
      if (this.state.tab.data.loadProfile.timeOfYear == "Summer"){
        this.state.tab.data.loadProfile.timeOfYear = "Winter"
      }
      else {
        this.state.tab.data.loadProfile.timeOfYear = "Summer"
      }

      console.log(this.state.tab.data.loadProfile.timeOfYear)
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

                    <div id="toggle-container">
                        <table id="toggle-table">
                          <tr>
                          </tr>
                            <td id="td-summer"> <label> Summer Load </label> </td>
                            <td id="td-toggle"> <label> <Toggle onToggle={ () => { this.setToggle() }} /> </label> </td>
                            <td id="td-winter"> <label> Winter Load  </label> </td>
                        </table>
                    </div>

                    <div className="data-sheet">
                        <ReactDataSheet
                            data={this.state.tab.data.loadProfile.grid}
                            valueRenderer={ (cell) => cell.value }
                            onChange= {(cell, rowI, colJ, value) => {
                                let tempTab = Object.assign({}, this.state.tab)
                                for (let i = 0; i < tempTab.data.loadProfile.grid.length; i++){
                                    if(tempTab.data.loadProfile.grid[rowI][colJ] !== value && tempTab.data.loadProfile.grid[rowI][colJ].readOnly !== true){
                                        tempTab.data.loadProfile.grid[rowI][colJ].value = value
                                    }

                                }
                                return this.setState({
                                    tab : tempTab
                                })
                            }}
                         />
                    </div>


                     <br />



                     <div className="center">

                         <input
                             id="file-upload"
                             type="file"
                             style={{display : "none"}}
                             accept=".csv"
                             onChange={ (event, stuff) => {
                                 window.TEST = event.target

                                 // we have a file
                                 if(event.target.files.length !== 0){


                                     let tempTab = Object.assign({}, this.state.tab)

                                     // TODO: need to implement actual reading of .csv, .xlsx, .xls files and populate the grid with it

                                     for (let i = 1; i < tempTab.data.loadProfile.grid.length - 1; i++){
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


                             let LOAD_DATA_ARR = (LOAD_DATA.split(','))
                             let index = 0;


                             for (let i = 1; i < tempTab.data.loadProfile.grid.length ; i++){
                                 for (let j = 1; j < tempTab.data.loadProfile.grid[i].length; j++){
                                     tempTab.data.loadProfile.grid[i][j].value =  LOAD_DATA_ARR[index]
                                     index++
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

    setAdditionalConstraints(event, text){
        console.log(event.target)

        let tempTab = Object.assign({}, this.state.tab)



        if (event.target.id === "cost-constraint-input"){
            tempTab.data.additionalConstraints.costConstraint.value = text
            return this.setState({
                tab : tempTab
            })
        }
        if (event.target.id === "solar-size-constraint-input"){
            tempTab.data.additionalConstraints.solarSizeConstraint.value = text
            return this.setState({
                tab : tempTab
            })
        }
        if (event.target.id === "grid-size-constraint-input"){
            tempTab.data.additionalConstraints.gridSizeConstraint.value = text
            return this.setState({
                tab : tempTab
            })
        }
        if (event.target.id === "generator-size-constraint-input"){
            tempTab.data.additionalConstraints.generatorSizeConstraint.value = text
            return this.setState({
                tab : tempTab
            })
        }
        if (event.target.id === "battery-size-constraint-input"){
            tempTab.data.additionalConstraints.batterySizeConstraint.value = text
            return this.setState({
                tab : tempTab
            })
        }


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




    getStepTwo(){
        let constraints = []

        if (this.state.tab.data.additionalConstraints.costConstraint.checked){
            constraints.push(
                <div>
                    <label className="center"> Cost Constraint </label>
                    <div className="cost-constraint-input-container center constraint">
                        <TextField id="cost-constraint-input" value={this.state.tab.data.additionalConstraints.costConstraint.value}  hintText="" onChange={this.setAdditionalConstraints.bind(this)}/>
                    </div>
                </div>

            )
        }
        if (this.state.tab.data.additionalConstraints.solarSizeConstraint.checked){
            constraints.push(
                <div>
                    <label className="center"> Solar Size Constraint (kW) </label>
                    <div className="solar-size-constraint-input-container center constraint">
                        <TextField id="solar-size-constraint-input" value={this.state.tab.data.additionalConstraints.solarSizeConstraint.value}  hintText="" onChange={this.setAdditionalConstraints.bind(this)}/>
                    </div>
                </div>

            )
        }
        if (this.state.tab.data.additionalConstraints.gridSizeConstraint.checked){
            constraints.push(
                <div>
                    <label className="center"> Grid Size Constraint (kW) </label>
                    <div className="grid-size-constraint-input-container center constraint">
                        <TextField id="grid-size-constraint-input" value={this.state.tab.data.additionalConstraints.gridSizeConstraint.value}  hintText="" onChange={this.setAdditionalConstraints.bind(this)}/>
                    </div>
                </div>
            )
        }
        if (this.state.tab.data.additionalConstraints.generatorSizeConstraint.checked){
            constraints.push(
                <div>
                    <label className="center"> Generator Size Constraint (kW) </label>
                    <div className="generator-size-constraint-input-container center constraint">
                        <TextField id="generator-size-constraint-input" value={this.state.tab.data.additionalConstraints.generatorSizeConstraint.value}  hintText="" onChange={this.setAdditionalConstraints.bind(this)}/>
                    </div>
                </div>

            )
        }
        if (this.state.tab.data.additionalConstraints.batterySizeConstraint.checked){
            constraints.push(
                <div>
                    <label className="center"> Battery Size Constraint (kW) </label>
                    <div className="battery-size-constraint-input-container center constraint">
                        <TextField id="battery-size-constraint-input" value={this.state.tab.data.additionalConstraints.batterySizeConstraint.value}  hintText="" onChange={this.setAdditionalConstraints.bind(this)}/>
                    </div>
                </div>

            )
        }
        /*
        if (this.state.tab.data.additionalConstraints.chargeFromSolar.checked){
            constraints.push(
                <div>
                    <label className="center"> Charge From Solar </label>
                </div>
            )
        }
        */
        return (
            <div>
                {
                    constraints.map( (index) => {
                        return index
                    })
                }
            </div>
        )

    }

    getSteps(){
        if (this.state.tab.data.additionalConstraints.step === 0){
            return(
                <div className="stepper-content-1">
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
                <div className="stepper-content-2">
                    {this.getStepTwo()}
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
                        </Stepper>
                        {this.getSteps()}
                        <div className="center">
                            <RaisedButton label="Next" primary={true} className="blue-button" onClick={() => {
                                let tempTab = Object.assign({}, this.state.tab)

                                if (tempTab.data.additionalConstraints.step < 1){
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
                            tempTab.isCompleted  = true
                            tempTab.isSubmitting = true
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


    showLoadingBar(){
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <div className="container center">
                    <CircularProgress size={80} thickness={5} color={"#0075BF"}  />
                </div>
                <br />
                <div className="center">
                    <p>
                      Calculating...
                    </p>
                </div>
            </div>
        </MuiThemeProvider>
      )
    }
    saveTabToServer(){
      let hash = window.location.href.split('/')[window.location.href.split('/').length - 1]

      fetch('/api/' + hash, {
        method  : 'POST',
        body    : JSON.stringify(TabStore.getTab(hash)),
        headers : {
          "Content-Type" : "application/json"
        }
      }).then( (response) => {
          response.json().then( (data) => {
            console.log(data)
            if (data.error){
              // error handling here
            }
            else {
              // save the result to the tab



            }

            let tempTab = Object.assign({}, this.state.tab)
            tempTab.isSubmitting = false
            return this.setState({
              tab : tempTab
            })
          })
      }).catch( (error) => {
        console.log("Error: ", error)
      })
    }


    render(){

      // make sure the tab tab exists
      if (!this.state.tab){
        return null
      }
      if(this.state.tab.isSubmitting){
        this.saveTabToServer()
        return this.showLoadingBar()
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
          <h1>  The tab is completed {this.props.hash} </h1>
      )
    }
}


export default Edit
