import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import Header from "./components/Header"
import TabView from "./components/TabView"
import Home from "./components/Home"
import Footer from "./components/Footer"

import "./App.css"




class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/:hash" component={TabView} />
                <Footer />
            </div>
        </Router>
    );
  }
}

export default App;
