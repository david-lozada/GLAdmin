// Dependencies
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route/* , withRouter */} from 'react-router-dom'
import { inject, observer } from "mobx-react";

// Components
import Welcome from './components/welcome/Welcome'
import Frame from './components/Frame'


class App extends Component {
  UNSAFE_componentWillMount() {
    if (!this.props.globalStore.token) {
      this.props.globalStore.setAppLoaded();
    }
  }

  /* componentDidMount() {    
    if (this.props.globalStore.token) {
      this.props.userStore
        .pullUser()
        .finally(() => this.props.globalStore.setAppLoaded());
    }
  } */
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
App = inject("userStore", "globalStore")(observer(App))
export default App
