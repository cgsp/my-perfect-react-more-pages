import React, { Component } from 'react'
import ProviderHoc from '../provider-hoc'
import Slot from '../slot'

@ProviderHoc
class Provider extends Component {
  static displayName = 'Provider'
  render() {
    return (
      <div className="provider-container">
        <header>
          <Slot name="header" />
        </header>
        <main>
          <Slot />
        </main>
        <footer>
          <Slot name="footer" />
        </footer>
      </div>
    )
  }
}

export default Provider
