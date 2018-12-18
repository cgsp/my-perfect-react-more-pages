import Provider from './provider'
import AddOn from './add-on'

export { Provider, AddOn }
// 用法试例
/**
 * 
 * 
 * import React, { Component } from 'react'
   import { Provider, AddOn } from '@Components/slot-provider'

  export default class Test extends Component {
    state = {}

    render() {
      return (
        <Provider>
          <AddOn slot="header">
            <h1 style={{ color: 'red' }}>这里可能是一个页面标题</h1>
          </AddOn>
          <AddOn>
            <p>主要内容的一个段落。</p>
            <p>另一个段落。</p>
          </AddOn>
          <AddOn slot="footer">
            <p>这里有一些联系信息</p>
          </AddOn>
        </Provider >
      )
    }
  }
 */
