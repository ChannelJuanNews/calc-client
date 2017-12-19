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
      console.log('new update', this.state.tab)
      TabActions.saveTab(this.state.tab) // saving the tab
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

      console.log(this.state.tab)
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
                <Checkbox label="Go green" onCheck={ () => {this.setObjectives('gogreen')} } ref={ (checkbox) => {this.checkboxes.one = checkbox} }  />
              </div>
              <div className="bit-100">
                <Checkbox label="I want a micro grid" onCheck={ () => {this.setObjectives('microgrid')} } />
              </div>
              <div className="bit-100">
                <Checkbox label="I want to lower my bill" onCheck={ () => {this.setObjectives('lowerbill')} } />
              </div>
              <div className="bit-100">
                <Checkbox label="I want to go offgrid" onCheck={ () => {this.setObjectives('offgrid')} } />
              </div>
              <div className="bit-100">
                <Checkbox label="I need backup power" onCheck={ () => {this.setObjectives('backuppower')} } />
              </div>
              <div className="bit-100">
                <Checkbox label="Peak shaving" onCheck={ () => {this.setObjectives('peakshaving')} } />
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
      if(tech === "none"){
        // delete all entires from array
        // somehow uncheck all the boxes
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
                <Checkbox label="Generator" onCheck={ () => {this.setExistingTech('generator') } } />
              </div>
              <div className="bit-100">
                <Checkbox label="Solar panels" onCheck={ () => {this.setExistingTech('solar') } } />
              </div>
              <div className="bit-100">
                <Checkbox label="Batteries" onCheck={ () => {this.setExistingTech('batteries') } } />
              </div>
              <div className="bit-100">
                <Checkbox label="None of the above" onCheck={ () => {this.setExistingTech('none') } } />
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
