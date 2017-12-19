import React, { Component } from "react"

import {
  BottomNavigation,
  BottomNavigationItem,
  Paper
} from 'material-ui'

import {
  MuiThemeProvider,
  getMuiTheme
} from 'material-ui/styles'

import TabStore from '../stores/TabStore'


const muiTheme = getMuiTheme({})


class Footer extends Component {
  constructor(props){
    super(props)
    this.state = {
      hash : "Home",
      tab  : {
        title : "Home"
      }
    }
  }

  componentWillMount(){
    TabStore.on('focusontab', (hash) => {
        console.log('COME ON FOCUS TAB')
        this.setState({
          hash : hash,
          tab  : TabStore.getTab(hash)
        })
    })
  }

  render(){

    if (this.state.hash === "Home"){
      return(
        <div className="footer">
          <p className="curtitle">
            {this.state.hash}
          </p>
        </div>
      )
    }

    return (
      <div className="footer">
        <p className="curtitle">
          {this.state.tab.title}
        </p>
        <p className="curtab">
          {this.state.hash}
        </p>
      </div>
    )

  }
}


export default Footer
