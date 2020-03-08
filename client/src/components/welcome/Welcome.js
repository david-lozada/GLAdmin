// Dependencies
import React, { Component } from 'react'

// Components
import Login from './Login';
import Frame from '../Frame';

class Welcome extends Component {
  constructor(props){
    super(props)
    this.state = {
      view: 'login',
      userName: ''
    }
  }

  changeView() {
    this.setState({
      view: 'dashboard'
    })
  }

  setUser(userName) {
    this.setState({
      userName
    })
  }

  render() {
    if (this.state.view === 'login'){
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
                  <Login view={this.changeView.bind(this)} setUser={this.setUser.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <Frame user={this.state.userName}/>
    }
  }
}

export default Welcome