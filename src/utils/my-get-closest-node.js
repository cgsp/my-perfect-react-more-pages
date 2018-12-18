/**
 * dom操作方法,查找距离el，最近的，符合条件的，父级dom节点.
 * 
 * @param {Object} el 事件对象
 * @param {String} selector 选择器,字符串
 */
export function myGetClosestNode(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

/** 
 * 使用方法
*/
// import React, { Component } from 'react'
// import TestContainer from './test'
// import { Button } from 'antd'
// import { myGetClosestNode } from '@Utils/my-get-closest-node'

// export default class Test extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       data: 100
//     }
//     this.click = this.click.bind(this)
//   }

//   click(e) {
//     console.log(e)
//     console.log(myGetClosestNode(e.target, '.div2'))
//     console.log(myGetClosestNode(e.target, '#father'))
//   }

//   render() {
//     const { data } = this.state
//     return (
//       <div className="div2" id="gFather">
//         <div className="div1" id="father">
//           <TestContainer
//             data={data}
//             className="div1"
//           />
//           <Button onClick={this.click}>点击测试</Button>
//         </div>
//       </div>
//     )
//   }
// }

