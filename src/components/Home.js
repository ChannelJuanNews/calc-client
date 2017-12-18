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


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabs : TabStore.getAll()
        }
    }

    componentWillMount(){
        TabStore.on("change", () => {
            this.setState({
                tabs : TabStore.getAll()
            })
        })
    }

    render(){


        if (this.state.tabs.length === 2){
            // there are no packages
            return(
                <div >
                    <h1 className="center">
                        There are no packages
                    </h1>
                    <p className="center">
                        Use the add button to add new packages
                    </p>
                </div>
            )
        }


        return (
                <div>
                    {
                        TabStore.getAll().map((tab, index) => {
                            if (tab.hash !== "Home" && tab.hash !== "Add"){
                                return (
                                    <div key={index}>
                                            <h1>
                                                {tab.title}
                                            </h1>
                                            <p>
                                                {tab.hash}
                                            </p>
                                            <hr />
                                    </div>
                                )
                            }
                        })
                    }

                </div>
            )
    }
}

export default Home
