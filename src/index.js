// 兼容性处理，兼容低版本浏览器
import 'babel-polyfill'
import 'raf/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import fastclick from 'fastclick'
// import vConsole from 'vconsole'

// 引入一些没办法进行Npm安装的库，和script脚本(如browser.js和rem.js)
import '@Utils/libraries/browser'
// rem.js这个最好在index.html的head部位引入，不然加载速度可能没APP的主模块的速度快
// import '@Utils/libraries/rem-resize'
import '@Utils/libraries/handle-error-img'

// 手机端fastclick事件注册
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastclick.attach(document.body)
  }, false)
}

// 本地开发环境，vConsole注册
// if (process.env.REACT_APP_BUILD_ENV === 'development') {
//   new vConsole()
// }

/**
 * 移动端页面返回时,刷新页面,不从缓存里取.
 */
window.addEventListener('pageshow', function (event) {
  // event.persisted属性为true时，表示当前文档是从往返缓存中获取
  if (event.persisted) {
    window.location.reload()
  }
})


const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)

// 如果有需要热更新的代码的话
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}

registerServiceWorker()

// 用下面这个变量作为环境变量
// 分别是development,test-production,production
console.log(process.env.REACT_APP_BUILD_ENV)
