import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'

export const ProtectedRoute = ({ auth, component:Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render={()=>auth ? (
        	<Component/>
        ):
        	<Redirect to="/"/>
    	}
        />
    )
}

export const ProtectedLogin = ({ auth, component:Component, ...rest }) => {
    const history = useHistory()
	return (
        <Route
        {...rest}
        render={()=> !auth ? (
        	<Component/>
        ):
        	history.goBack()
    	}
        />
    )
}