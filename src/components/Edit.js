import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

import * as TabActions from "../actions/TabActions"
import TabStore from '../stores/TabStore'

import {
    Tabs,
    Tab,
    FontIcon,
    Checkbox,
    RaisedButton
}  from 'material-ui'

import { MuiThemeProvider, getMuiTheme }from 'material-ui/styles'
import Icons from "./Icons"

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
                <div className="center">
                  <RaisedButton className="center" label="Next" primary={true} onClick={ () => {

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
              <RaisedButton className="center" label="Next" primary={true} onClick={ () => {
                  console.log('this is where we would go from next')

              } } />
            </div>

          </div>
        </MuiThemeProvider>
      )
    }

    // Peak data entry =========================================================
    setPeaks() {

    }

    getPeaks(){

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
      else if (this.state.tab.objectivesDone){
        return this.getExistingTech()
      }
      else if (this.state.tab.existingTechDone){
        return <h1>next</h1>
      }

        return (
            <h1>  This is the edit view {this.props.hash} {this.state.tab.isNew.toString()}</h1>
        )
    }
}


export default Edit
