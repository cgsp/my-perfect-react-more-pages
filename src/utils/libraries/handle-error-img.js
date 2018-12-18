/* 
 * @Desc: 如果图片加载失败的话，加载默认的图片
 * @Author: John.Guan 
 * @Date: 2018-11-22 15:45:10 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-22 16:05:39
 */

(function (document) {
  document.addEventListener('error', function (e) {
    var elem = e.target
    if (elem.tagName.toLowerCase() === 'img') {
      // elem.src = 'http://pic1.win4000.com/pic/1/43/1634b462be.jpg'
      elem.src = 'static/media/defaultImg.jpg'
    }
  }, true)
})(document)
