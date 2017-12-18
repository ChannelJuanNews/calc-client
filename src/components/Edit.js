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
            hash            : this.props.hash,
            objectivesDone  : false,
            resourcesDone   : false,
            peaksDone       : false,
            loadProfileDone : false,
            constraintsDone : false
        }

        this.state.tab.data = {
          objectives    : [],
          existingTech  : [],
          peakData      : {
            onPeak : {
              time : null,
              price: null
            },
            offPeak : {
              time  : null,
              price : null
            },
            midPeak : {
              time  : null,
              price : null
            }
          },
          loadProfile : {},
          additionalConstraints : []
        }
    }

    componentDidUpdate(){
      console.log('new update')
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
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <div className="center">
              <h1>Please Enter Your Objectives</h1>
            </div>
            <div className="checkbox-container">
              <Checkbox  className="chkbx" label="Go Green" onCheck={ () => { this.setObjectives('gogreen') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="I want a mircogrid" onCheck={ () => { this.setObjectives('microgrid') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="I want to lower my bill" onCheck={ () => { this.setObjectives('lowerbill') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="I want to go offgrid" onCheck={ () => { this.setObjectives('offgrid') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="I need backup power" onCheck={ () => { this.setObjectives('backuppower') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="Peak Shaving" onCheck={ () => { this.setObjectives('peakshaving') }} />
            </div>
             <br />
            <div className="center">
              <RaisedButton className="center" label="Next" primary={true} onClick={ () => {
                console.log('testsetsetset')
                this.state.tab.isNew = false;
                this.setState({
                  objectivesDone : true
                })
              } } />
            </div>
          </div>
        </MuiThemeProvider>
      )
    }

    // EXISTING TECH ===========================================================

    setExistingTech(tech){

    }

    getExistingTech(){
      return(
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <div className="center">
              <h1>Do you have any of the following on site?</h1>
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="Generator" onCheck={ () => { this.setExistingTech('generator') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="Solar Panels" onCheck={ () => { this.setExistingTech('solar') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="Batteries" onCheck={ () => { this.setExistingTech('Batteries') }} />
            </div>
            <div className="checkbox-container">
              <Checkbox className="chkbx" label="None of the Above" onCheck={ () => {  }} />
            </div>
            <RaisedButton className="center" label="Next" primary={true} onClick={ () => {
              console.log('testsetsetset')
              this.state.tab.isNew = false;
              this.setState({
                objectivesDone : true
              })
            } } />
          </div>
        </MuiThemeProvider>
      )
    }

    // SAVE OR DELETE TAB ======================================================
    discardTab(){

    }

    saveTab(){

    }





    render(){
      if (this.state.tab.isNew){
        return this.getObjectives()
      }
      else if (this.state.objectivesDone){
        return this.getExistingTech()
      }

        return (
            <h1>  This is the edit view {this.props.hash} </h1>
        )
    }
}


export default Edit
