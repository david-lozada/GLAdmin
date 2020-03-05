import React, { Component } from 'react'
import axios from "axios";

class welcome extends Component {
  state = {
      userName: '',
      password: ''
  }

  handleChange = e => {
      this.setState({
          [e.target.id]: e.target.value
      })
  }

  handleSubmit = e => {
      e.preventDefault()
      //Axios request to authenticate
      axios.post('http://localhost:9000/auth/login', {
        userName: this.state.userName,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
      return (
        <div className="mdl-grid w-background">
          <div className="mdl-cell mdl-cell--8-col w-headline font-effect-3d-float">
            ADMINISTRATIVE
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <div className="mdl-shadow--6dp w-fit">
              <div className="mdl-card__supporting-text w-vcenter">
                  <div className="w-login-icon">
                    &nbsp;
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default welcome