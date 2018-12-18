/* 
 * @Desc: 默认的图片
 * @Author: John.Guan 
 * @Date: 2018-11-22 15:52:15 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-22 16:22:57
 */
import React from 'react'
import defalutImg from '@Assets/images/defaultImg.jpg'

const ImgPlaceholder = () => {
  return (
    <img src={defalutImg} alt="default" />
  )
}

export default ImgPlaceholder


/**
 * 用法简介
 */
// import React, { Component } from 'react'
// import LazyLoad from 'react-lazyLoad'
// import ImgPlaceHolder from '@Components/img-placeHolder'

// export default class Test extends Component {
//   render() {
//     return (
//       <div className={style['test']}>
//         {/* 不影响跳转 */}
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />}>
//           <a href="http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg" target="_blank">
//             <img src="http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg" />
//           </a>
//         </LazyLoad>
//         {/* 不影响点击事件 */}
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />} >
//           <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg" onClick={this.imgOnclick} />
//         </LazyLoad>
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />} >
//           <img src="http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg" />
//         </LazyLoad>
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />}>
//           <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg" />
//         </LazyLoad>
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />}>
//           <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg" />
//         </LazyLoad>
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />}>
//           <img src="http://ww4.sinaimg.cn/mw690/62aad664jw1f2nxw0p95dj20u01hc7d8.jpg" />
//         </LazyLoad>
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />}>
//           <img src="http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxw134xqj20u01hcqjg.jpg" />
//         </LazyLoad>
//         <LazyLoad throttle={200} placeholder={<ImgPlaceHolder />}>
//           {/* 
//             这个图片是错误的路径，
//             会触发handle-error-img这个方法加载默认图片
//             (utils/libraries/handle-error-img方法) 
//           */}
//           <img src="1111" />
//         </LazyLoad>
//       </div>
//     )
//   }
// }

