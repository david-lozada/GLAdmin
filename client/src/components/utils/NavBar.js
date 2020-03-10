import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

class NavBar extends Component {
    render() {
        return (
            <Fragment>
                <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">Home</span>
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                  <i className="material-icons">search/</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                  <input className="mdl-textfield__input" type="text" id="search"/>
                  <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
                </div>
              </div>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                <i className="material-icons">more_vert</i>
              </button>
              <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
                <li className="mdl-menu__item">About</li>
                <li className="mdl-menu__item">Contact</li>
                <li className="mdl-menu__item">Legal information</li>
              </ul>
            </div>
          </header>
          <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <header className="demo-drawer-header">
              <div className="demo-avatar-dropdown">
                <span>Nombre de Usuario</span>
                <div className="mdl-layout-spacer"></div>
                <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                  <i className="material-icons" role="presentation">arrow_drop_down</i>
                  <span className="visuallyhidden">Accounts</span>
                </button>
                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
                  <li className="mdl-menu__item">hello@example.com</li>
                  <li className="mdl-menu__item">info@example.com</li>
                  <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
                </ul>
              </div>
            </header>
            <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                <Link className="mdl-navigation__link" to='#'><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</Link>
                <Link className="mdl-navigation__link" to='#'><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</Link>
                <Link className="mdl-navigation__link" to='#'><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</Link>
                <Link className="mdl-navigation__link" to='#'><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</Link>
                <Link className="mdl-navigation__link" to='#'><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</Link>
                <Link className="mdl-navigation__link" to='#'><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</Link>
            </nav>
          </div>
            </Fragment>
        )
    }
}


NavBar = inject("userStore", "globalStore")(observer(NavBar))
export default NavBar