/* 
 * @Desc: 在入口index.js的地方引入，有时候，会出现加载速度过慢的问题，最稳妥的方式，还是，在入口的index.html的head那个地方引入
 * @Author: John.Guan 
 * @Date: 2018-12-18 15:25:32 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-12-18 15:26:37
 */

(function (document, window) {
  var docEl = document.documentElement,
    resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
    resetRootFontSize = function () {
      var clientWidth = docEl.clientWidth
      console.log('clientWidth', clientWidth)

      if (!clientWidth) {
        return
      }

      // docEl.style.fontSize = 100 * ( clientWidth / 750 ) + 'px'

      if (clientWidth >= 1080) {
        docEl.style.fontSize = '100px'
      } else {
        // 设计稿，按照宽度750px来算
        // 这样保证1rem，就是100px
        // 如果width=7.5rem，就代表的是当前屏幕的100%
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
      }
    }

  if (!document.addEventListener) {
    return
  }
  window.addEventListener(resizeEvent, resetRootFontSize, false)
  document.addEventListener('DOMContentLoaded', resetRootFontSize, false)
})(document, window)
