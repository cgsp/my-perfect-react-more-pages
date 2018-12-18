/* 
 * @Desc: 配合路由切换的转场动画--第一次切换或者频繁切换时候，会有bug
 * @Author: John.Guan 
 * @Date: 2018-11-23 15:13:04 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-23 16:34:42
 */
import React, { Component } from 'react'
// pc端的骨架
// import MainFrame from '../dashboard-pc/main-frame'
// mobile端的骨架
import MainFrame from '../dashboard-mobile/main-frame'
import { Route, withRouter, Redirect } from 'react-router-dom'
// import { inject, observer } from 'mobx-react'
import { asyncComponent } from './asyncComponent'
import QueueAnim from 'rc-queue-anim'

/**
 *  404模块
 */
// 直接引入模块
// import NoMatch404 from '@Pages/no-match-404'
// 懒加载引入模块
// const NoMatch404 = asyncComponent(() => import('@Pages/no-match-404'))


@withRouter
export default class Routes extends Component {
  render() {
    let { pathname } = this.props.location
    /**
      * 先对导航级的路由做控制，功能按钮级的，系统全部完成之后，最后再做控制
      * 功能按钮级的，现在show属性全部设置true, 系统全部完成之后，最后再做控制
     */
    const allNavList = [
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
        component: asyncComponent(() => import('@Pages/no-match-404')),
        show: true
      },
    ]
    const hasAuthNavList = allNavList.filter(item => item.show)

    // 如果跳转的是根路由，直接进入首页
    if (pathname === '/') {
      return <Redirect to='/index' />
    }

    // 如果进入的路由是hasAuthNavList，里面没有的路由，那么直接进入404页面
    let is404 = true
    hasAuthNavList.forEach(item => {
      if (item.path === pathname) {
        is404 = false
      }
    })
    if (is404) {
      return <Redirect to='/no-match-404' />
    }

    const nowPage = hasAuthNavList.find(v => {
      return v.path === pathname
    })
    return (
      <MainFrame>
        <QueueAnim
          type='scaleX'
          duration={500}
          delay={0}
          appear={true}
          interval={100}
        >
          {/* 
            如果要让转场动画生效的话，需要只渲染一个route，然后根据当前的path来决定组件是啥
        */}
          <Route path={nowPage.path} component={nowPage.component} key={nowPage.path} exact />
        </QueueAnim>
      </MainFrame >
    )
  }
}
