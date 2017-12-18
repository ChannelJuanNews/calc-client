import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

import * as TabActions from "../actions/TabActions"
import TabStore from '../stores/TabStore'

import {
    Tabs,
    Tab,
    FontIcon
}  from 'material-ui'

import { MuiThemeProvider, getMuiTheme }from 'material-ui/styles'
import Icons from "./Icons"

const muiTheme = getMuiTheme({
  appBar: {
    height: 70,
  }
})


class Edit extends Component {


    constructor(props){
        super(props)
        this.state = {
            tab     : TabStore.getTab(this.props.hash),
            hash    : this.props.hash
        }
    }


    discardTab(){

    }

    saveTab(){

    }





    render(){
        return (
            <h1>  This is the edit view {this.props.hash} </h1>
        )
    }
}


export default Edit
