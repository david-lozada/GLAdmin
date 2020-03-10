// Dependencies
import React, { Component } from 'react'
//Store
// Components
import Login from './Login'
import { observer, inject } from 'mobx-react'

var Welcome = inject("authStore")(
  observer(
    class Welcome extends Component {
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
                    <Login />
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  )
)

export default Welcome