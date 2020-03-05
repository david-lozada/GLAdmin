import React, { Component } from 'react'

class App extends Component {
  state = {
    user: '',
    password: ''
  }

  render() {
    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title"></span>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
          <header className="demo-drawer-header">
            <div className="demo-avatar-dropdown">
            </div>
          </header>
          <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
            
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            
          </div>
        </main>
    </div>
    )
  }
}

export default App