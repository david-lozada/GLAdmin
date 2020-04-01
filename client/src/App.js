// Dependencies
import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import { inject, observer } from "mobx-react";
import { ThemeProvider } from '@material-ui/core'
import theme from './Theme';

// Components
import Frame from './pages/Frame';
import Welcome from './pages/Welcome';
import { ProtectedRoute, ProtectedLogin } from './components/ProtectedRoutes';


const App = inject("userStore", "globalStore")(
  observer(({ userStore, globalStore }) => {
  	const history = useHistory()
  	useEffect(() => {
  		if (!globalStore.token) {
  		  globalStore.setAppLoaded()
  		}
  		return () => {
  			if (globalStore.token) {
	      		userStore.pullUser()
	        	.finally(() => globalStore.setAppLoaded());
	    	} 
  		}
  	}, [userStore, globalStore, history])
    return (
        <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <ProtectedLogin exact path="/"  auth={globalStore.token} component={Welcome} />
            <ProtectedRoute path="/home" auth={globalStore.token} component={Frame} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
})
)

export default App