import React, { Component } from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
import { HashRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import OrientationWrapper from '@Components/orientation-wrapper'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Provider } from 'mobx-react'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 引入全局的scss
import '@Assets/style/index'

import RootRoutes from '@Router'
import Stores from '@Store'

class App extends Component {
  render() {
    return [
      <Provider {...Stores} key='app'>
        <LocaleProvider locale={zhCN}>
          <Router>
            <RootRoutes />
          </Router>
        </LocaleProvider>
      </Provider>,
      <OrientationWrapper key='orientationWrapper' />
    ]
  }
}

export default App
