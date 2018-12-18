/* 
 * @Desc: 组件级的进入进出，动画，适用于列表的循环
 * @Author: John.Guan 
 * @Date: 2018-11-23 15:10:43 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-23 17:12:59
 */
import React, { Component } from 'react'
import style from './style.scss'
// import QueueAnim from 'rc-queue-anim'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: ['关赛鹏', '常慧', '妈妈', '爸爸', '爷爷', '奶奶', '爸爸1', '爷爷1', '奶奶1']
    }
  }

  render() {
    const items = this.state.arr.map(item => {
      return (
        <div key={item} className={style.line}>{item}</div>
      )
    })
    return (
      <div>
        {items}
      </div>
    )
  }
}
