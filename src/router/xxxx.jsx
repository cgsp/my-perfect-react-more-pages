/* 
 * @Desc: 如果不做路由切换的转场动画的话
 * @Author: John.Guan 
 * @Date: 2018-11-23 15:12:36 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-23 15:12:59
 */

import React, { Component } from 'react'
// pc端的骨架
// import MainFrame from '../dashboard-pc/main-frame'
// mobile端的骨架
import MainFrame from '../dashboard-mobile/main-frame'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
// import { inject, observer } from 'mobx-react'
import { asyncComponent } from './asyncComponent'

/**
 *  404模块
 */
// 直接引入模块
// import NoMatch404 from '@Pages/no-match-404'
// 懒加载引入模块
const NoMatch404 = asyncComponent(() => import('@Pages/no-match-404'))


@withRouter
export default class Routes extends Component {
  render() {
    /**
      * 先对导航级的路由做控制，功能按钮级的，系统全部完成之后，最后再做控制
      * 功能按钮级的，现在show属性全部设置true, 系统全部完成之后，最后再做控制
     */
    const allNavList = [
      // 首页模块
      {
        path: '/index',
        component: asyncComponent(() => import('@Pages/index')),
        show: true
      },
      // 测试模块
      {
        path: '/test',
        component: asyncComponent(() => import('@Pages/test')),
        show: true
      },
      // 404模块
      {
        path: '/no-match-404',
        component: NoMatch404,
        show: true
      },
    ]
    const toDefaultUrl = '/index'
    const hasAuthNavList = allNavList.filter(item => item.show)
    return (
      <MainFrame>
        <Switch>
          <Route path="/" render={() => <Redirect to={toDefaultUrl} />} exact key="/" />
          {
            hasAuthNavList.map(item =>
              (
                <Route path={item.path} component={item.component} key={item.path} exact />
              )
            )
          }
          {/* 
          <Route path="/no-match-404" component={NoMatch404} />
          <Redirect to="/no-match-404" />
          */}
          {/* 这样写也可以 */}
          <Route component={NoMatch404} />
        </Switch>
      </MainFrame>
    )
  }
}
