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


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabs : TabStore.getAll()
        }
    }
    componentWillMount(){
        TabStore.on('change', () => {
            this.setState({
                tabs : TabStore.getAll()
            })
        })
    }
    addTab(history){
        let title = prompt("Enter Package Title")
        if (title !== null && title.trim() !== ""){
            TabActions.addTab(title)
            history.push("/" + TabStore.getAll()[TabStore.getAll().length - 2].hash)
            TabActions.focusOnTab(TabStore.getAll()[TabStore.getAll().length - 2].hash)
        }
    }

    focusOrAddTab(tab, history){
        if (tab.hash === "Add"){
            console.log('the add button was clicked')
            return this.addTab(history)
        }
        TabActions.focusOnTab(tab.hash)
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Tabs id="tab-container" style={{backgroundColor : "#0075BF"}}>
                    {
                        this.state.tabs.map( (tab, index) => {
                            if (tab.hash == "Add"){
                                return <Tab className="add" key={tab.hash} label={tab.title} onActive={() => {this.focusOrAddTab( tab, this.props.history)}} />
                            }
                            else if (tab.hash == "Home"){
                                return <Tab key={tab.hash} label={tab.title} containerElement={ <Link to={"/" }/> }  />
                            }
                            return <Tab key={tab.hash} label={tab.title} containerElement={ <Link to={"/" + tab.hash }/> } onActive={() => {this.focusOrAddTab( tab, this.props.history)}} />
                        })
                    }
                </Tabs>
            </MuiThemeProvider>
        )
    }
}


export default withRouter(Header)
