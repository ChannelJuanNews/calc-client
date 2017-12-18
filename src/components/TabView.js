import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

import * as TabActions from "../actions/TabActions"
import TabStore from '../stores/TabStore'

import {
    Tabs,
    Tab,
    FontIcon
}  from 'material-ui'

import { CircularProgress } from 'material-ui';
import { MuiThemeProvider, getMuiTheme }from 'material-ui/styles'

import Icons from "./Icons"
import Edit from "./Edit"


const muiTheme = getMuiTheme({
  appBar: {
    height: 70,
  }
})


class TabView extends Component {
    constructor(props){
        super(props)
        this.state = {
            hash        : "",
            tab         : "",
            tabExists   : false,
            loading     : true

        }
    }
    componentWillMount(){
        TabStore.on('focusontab', (hash) => {
            console.log( "we are focusing on hash " + Math.random().toString() , hash)
            this.setState({
                hash : hash,
                tab  : TabStore.getTab(hash)
            })
        })
    }

    componentDidMount(){
        let hash = window.location.href.split('/')[window.location.href.split('/').length - 1]
        new Promise( (resolve, reject) => {
            fetch("/api/" + hash)
                .then( (res) => {
                    console.log(res)
                    res.json().then( (data) => {

                        if (data.error){
                            return reject()
                        }
                        resolve(data)
                    })
                })
                .catch( (error) => {
                    reject(error)
                })
        })
        .then( (data) => {
            this.setState({
                hash        : hash,
                tab         : data,
                hashExists  : true,
                loading     : false
            })
        })
        .catch( (error) => {
            // the hash does not exist on the database, so let us look locally
            let hash = window.location.href.split('/')[window.location.href.split('/').length - 1]
            let tabs = TabStore.getAll()

            for (let i = 0; i < tabs.length; i++){
                if (tabs[i].hash === hash){
                    return this.setState({
                        tabExists   : true,
                        loading     : false,
                        hash        : hash,
                        tab         : tabs[i]
                    })
                }
            }

            // if we get here, then the tab neither exists on the server nor the client
            this.setState({
                loading : false
            })

            alert("This Package Does Not exist!")
            this.props.history.push("/")
        })
    }

    render(){
        if (this.state.loading){
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <div className="container center">
                            <CircularProgress size={80} thickness={5} color={"#0075BF"}  />
                        </div>
                        <div className="center">
                            <p>
                                Loading Package from Server or Tab List
                            </p>
                        </div>
                    </div>
                </MuiThemeProvider>
            )
        }
        if (this.state.tab.isNew){
            // return the edit view
            return <Edit hash={this.state.tab.hash} />
        }

        return (
            <h1> {this.state.hash} </h1>
        )
    }
}


export default withRouter(TabView)
