import React, { Component } from 'react'

export default class dashboard extends Component {
    render() {
        return (
            <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Home</span>
                </div>
                </header>
                <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header className="demo-drawer-header">
                    <div className="demo-avatar-dropdown">
                    <span>hello@example.com</span>
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
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
                    <div className="mdl-layout-spacer"></div>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
                </nav>
                </div>
                <main className="mdl-layout__content mdl-color--grey-100">
                <div className="mdl-grid demo-content">
                    <div className="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
                    <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
                        <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
                        <h2 className="mdl-card__title-text">Updates</h2>
                        </div>
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                        Non dolore elit adipisicing ea reprehenderit consectetur culpa.
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                        <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a>
                        </div>
                    </div>
                    </div>
                </div>
                </main>
            </div>
        )
    }
}
