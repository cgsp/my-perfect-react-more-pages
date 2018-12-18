import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import MaskLoading from '@Components/mask-loading'
import style from './style'
import Nav from '../nav'

@inject('AppLoadingStore')
@observer
export default class MainFrame extends Component {
  render() {
    // 路由插座
    const { children } = this.props
    let { appLoading } = this.props.AppLoadingStore
    return (
      <div className={style['app-layout']}>
        {/* 全局的loading */}
        {
          appLoading ? <MaskLoading /> : null
        }
        <div className={style['app-content']}>
          {children}
        </div>
        <div className={style['app-nav']}>
          <Nav />
        </div>
      </div>
    )
  }
}
