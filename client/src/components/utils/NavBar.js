import React, { Component, Fragment } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <Fragment>
                <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                    <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title"></span>
                    </div>
                </header>
                <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <header className="demo-drawer-header">
                    <div className="demo-avatar-dropdown">
                        Menu
                    </div>
                    </header>
                    <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                    Menu
                    </nav>
                </div>
            </Fragment>
        )
    }
}
