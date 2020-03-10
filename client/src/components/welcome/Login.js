// Dependencies
import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { withRouter } from 'react-router-dom'    
import ListErrors from '../utils/ListErrors';
import alertify from 'alertifyjs'

var Login = inject("authStore")(
    observer(
        class Login extends Component {
            componentWillUnmount() {
                this.props.authStore.reset();
            }

            handleUserNameChange = e => {
                this.props.authStore.setUserName(e.target.value);
            };

            handlePasswordChange = e => {
                this.props.authStore.setPassword(e.target.value);
            };

            handleSubmit = e => {
                e.preventDefault();
                if (!this.props.authStore.values.username || !this.props.authStore.values.password) {
                    alertify.warning('Campos requeridos')
                }
                this.props.authStore.login().then(() => this.props.history.push('/home'));
            }
            render() {
                const { values, errors, inProgress } = this.props.authStore;
                return (
                <div className="mdl-grid">
                    <ListErrors errors={errors}/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" 
                                id="userName" 
                                type="text"
                                value={values.username} 
                                onChange={this.handleUserNameChange}/>
                            <label className="mdl-textfield__label" htmlFor="userName"><i className="material-icons">account_circle</i>&nbsp;&nbsp;Usuario</label>
                        </div>
                        <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" 
                            type="password" 
                            id="password" 
                            value={values.password} 
                            onChange={this.handlePasswordChange}/>
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
    )
)
export default withRouter(Login)
