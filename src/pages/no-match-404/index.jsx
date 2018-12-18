/* 
 * @Desc: 页面没有找到
 * @Author: John.Guan 
 * @Date: 2018-11-22 13:43:27 
 * @Last Modified by: John.Guan 
 * @Last Modified time: 2018-11-22 13:43:27 
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './style'
import Img_NotFound2X from './not_found@2x.png'
import Img_NotFound3X from './not_found@3x.png'
import { myWinDpr } from '@Utils/my-win-dpr'

export default class NoMatch404 extends Component {
  render() {
    const Img_NotFound = myWinDpr > 2 ? Img_NotFound3X : Img_NotFound2X
    return (
      <div className={style['no-match-404']}>
        <div className={style['img-wrap']}>
          <img className={style.img} src={Img_NotFound} alt="" />
        </div>
        <div className={style['btn-wrap']}>
          <Link to="/" className={style.btn}>前往首页</Link>
        </div>
      </div>
    )
  }
}
