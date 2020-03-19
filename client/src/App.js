// Dependencies
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { inject, observer } from "mobx-react";
import { ThemeProvider } from '@material-ui/core'
import theme from './Theme';

// Components
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';


class App extends Component {
  UNSAFE_componentWillMount() {
    if (!this.props.globalStore.token) {
      this.props.globalStore.setAppLoaded();
    }
  }

  componentDidMount() {    
    if (this.props.globalStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.globalStore.setAppLoaded());
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/home" component={Dashboard} />
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}
App = inject("userStore", "globalStore")(observer(App))
export default App
