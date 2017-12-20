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
      // set the state variables with the correct values of the current

      let hash = window.location.href.split('/')[window.location.href.split('/').length - 1]

      if (this.state.tab.hash === hash){
        console.log('new update', this.state.tab)
        TabActions.saveTab(this.state.tab) // saving the tab
        return
      }

      this.setState({
        tab   : TabStore.getTab(hash),
        hash  : hash
      })

    }


    // OBJECTIVES ==============================================================
    setObjectives(objective){

      let index = this.state.tab.data.objectives.indexOf(objective)
      if (index !== -1){
        // element exists in array, so remove it
        this.state.tab.data.objectives.splice(index, 1)
      }
      else {
        this.state.tab.data.objectives.push(objective)
      }

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
                <Checkbox label="Go green"                  defaultChecked={ ( () => {if (this.state.tab.data.objectives.indexOf(GOGREEN) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(GOGREEN)} }  />
              </div>
              <div className="bit-100">
                <Checkbox label="I want a micro grid"       defaultChecked={ ( () => {if (this.state.tab.data.objectives.indexOf(MICROGRID) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(MICROGRID)} } />
              </div>
              <div className="bit-100">
                <Checkbox label="I want to lower my bill"   defaultChecked={ ( () => {if (this.state.tab.data.objectives.indexOf(LOWERBILL) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(LOWERBILL)} } />
              </div>
              <div className="bit-100">
                <Checkbox label="I want to go offgrid"      defaultChecked={ ( () => {if (this.state.tab.data.objectives.indexOf(OFFGRID) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(OFFGRID)} } />
              </div>
              <div className="bit-100">
                <Checkbox label="I need backup power"       defaultChecked={ ( () => {if (this.state.tab.data.objectives.indexOf(BACKUPPOWER) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(BACKUPPOWER)} } />
              </div>
              <div className="bit-100">
                <Checkbox label="Peak shaving"              defaultChecked={ ( () => {if (this.state.tab.data.objectives.indexOf(PEAKSHAVING) === -1){return false}; return true} )() } onCheck={ () => {this.setObjectives(PEAKSHAVING)} } />
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
      if (tech === NOTECH){
        this.state.tab.data.existingTech = [] // assign empty array
        this.state.tab.data.existingTech.push(NOTECH)
      }

      if (tech !== NOTECH){
        let index = this.state.tab.data.existingTech.indexOf(NOTECH)
        if  (index !== -1){
            // element exists so remove it
            this.state.tab.data.existingTech.splice(index, 1)
        }
        else {
          this.state.tab.data.existingTech.push(tech)
        }
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

            <div className="frame">
              <div className="bit-100">
                <Checkbox label="Generator"  defaultChecked={ ( () => {if (this.state.tab.data.existingTech.indexOf(GENERATOR) === -1){return false}; return true} )() } onCheck={ () => {this.setExistingTech(GENERATOR) } } />
              </div>
              <div className="bit-100">
                <Checkbox label="Solar panels" defaultChecked={ ( () => {if (this.state.tab.data.existingTech.indexOf(SOLAR) === -1){return false}; return true} )() } onCheck={ () => {this.setExistingTech(SOLAR) } } />
              </div>
              <div className="bit-100">
                <Checkbox label="Batteries"  defaultChecked={ ( () => {if (this.state.tab.data.existingTech.indexOf(BATTERIES) === -1){return false}; return true} )() } onCheck={ () => {this.setExistingTech(BATTERIES) } } />
              </div>
              <div className="bit-100">
                <Checkbox label="None of the above" defaultChecked={false} onCheck={ () => {this.setExistingTech('none') } } />
              </div>
            </div>

            <br />

            <div className="center">
              <RaisedButton className="center" label="Next" primary={true} onClick={ () => {
                console.log('existing tech done')
                this.setState({
                  existingTechDone : true
                })
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
