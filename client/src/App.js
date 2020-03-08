// Dependencies
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Components
import Welcome from './components/welcome/Welcome'
import Frame from './components/Frame'


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/home" component={Frame} />
        </Switch>
      </Router>
    )
  }
}

export default App