/* 
 * @Desc: 获取顶层对象
 * @Author: John.Guan 
 * @Date: 2018-12-03 16:40:51 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-12-03 16:47:40
 */

// 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
// 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
// Node 里面，顶层对象是global，但其他环境都不支持。

// const myGetGlobal = () => {
//   let myGlobal
//   if (typeof window !== 'undefined') {
//     myGlobal = window
//   } else {
//     if (typeof process === 'object' && typeof require === 'function' && typeof global === 'object') {
//       myGlobal = global
//     } else {
//       myGlobal = this
//     }
//   }
//   return myGlobal
// }

const myGetGlobal = () => {
  if (typeof self !== 'undefined') { return self }
  if (typeof window !== 'undefined') { return window }
  if (typeof global !== 'undefined') { return global }
  throw new Error('无法获取顶层对象')
}

export { myGetGlobal }
