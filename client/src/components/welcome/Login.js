// Dependencies
import React, { Component } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoggedIn: false // <-- initialize the signup state as false
        }
    }
  
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
  
    handleSubmit = e => {
        e.preventDefault()
        const userName =  this.state.userName
        const password = this.state.password
        if (!userName || !password) {
            alertify.warning('Campos requeridos');
            return null
        }
        //Axios request to authenticate
        /* TODO: Automatizar la url de la api */
        axios.post( 'http://localhost:9000/auth/login', {
          userName,
          password
        })
        .then(res => {
            if (res.status === 200) {
            this.props.setUser(res.data.user.userName)
            this.props.view()
            }
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }
    render() {
        return (
        <div className="mdl-grid">
            <form onSubmit={this.handleSubmit}>
                <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" id="userName" type="text" onChange={this.handleChange}/>
                    <label className="mdl-textfield__label" htmlFor="userName"><i className="material-icons">account_circle</i>&nbsp;&nbsp;Usuario</label>
                </div>
                <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="password" id="password" onChange={this.handleChange}/>
                    <label className="mdl-textfield__label" htmlFor="password"><i className="material-icons">lock</i>&nbsp;&nbsp;Contraseña</label>
                </div>
                <button className="mdl-cell mdl-cell--12-col mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Entrar
                </button>
            </form>
        </div>
        )
    }
}

export default Login