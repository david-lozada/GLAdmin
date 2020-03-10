// Dependencies
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Components
import Dashboard from './dashboard/Dashboard'
import NavBar from './layouts/NavBar'


class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: true
    }
  }
  render() {
    return (
      <Router>
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <NavBar/>
          <main className="mdl-layout__content mdl-color--grey-100">
            <div className="mdl-grid demo-content">
              <Switch>
                  <Route exact path='/dashboard' component={Dashboard}/>
              </Switch>
            </div>
          </main>
      </div>
    </Router>
    )
  }
}

export default Frame