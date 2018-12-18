/* 
 * @Desc: 横屏时,提示不可浏览.
 * @Author: Eleven 
 * @Date: 2018-11-13 09:59:58 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-22 11:33:00
 */

import React from 'react'
import ReactDOM from 'react-dom'
import style from './style'

const OrientationWrapper = (props) => {
  let container = document.getElementById('appOrientationWrapper')
  if (!container) {
    container = document.createElement('div')
    container.id = 'appOrientationWrapper'
    document.body.appendChild(container)
  }

  if (!container) return null

  return ReactDOM.createPortal(
    <div className={style['orientation-wrapper']}>
      <div className={style.phone} />
      <p className={style.tip}>为了更好的用户体验，请将屏幕竖向浏览！</p>
    </div>,
    container
  )
}

export default OrientationWrapper
