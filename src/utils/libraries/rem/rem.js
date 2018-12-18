/* eslint-disable */
(function (document, window) {
  var docEl = document.documentElement,
    resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
    resetRootFontSize = function () {
      var clientWidth = docEl.clientWidth;

      if (!clientWidth) {
        return;
      }

      // docEl.style.fontSize = 100 * ( clientWidth / 750 ) + 'px';

      if (clientWidth >= 1080) {
        docEl.style.fontSize = '100px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };

  if (!document.addEventListener) {
    return;
  }
  window.addEventListener(resizeEvent, resetRootFontSize, false);
  document.addEventListener('DOMContentLoaded', resetRootFontSize, false);
})(document, window);
/* eslint-enable */
