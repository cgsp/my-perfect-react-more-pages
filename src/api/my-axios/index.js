import axios from 'axios'
import qs from 'qs'
import { config, headers, responseType } from './config'
import Store from '@Store'
import { mySessionStorageClear } from '@Utils/my-storages'
import { NO_LOGIN_CODE, NO_AUTH_CODE } from '@Constants'


let defaultConfig = config
let defaultHeaders = headers
let defaultResponseType = responseType

// 设置一个全局变量，标记当前开启了几个ajax
let openAjaxNum = 0
const Service = axios.create(defaultConfig)
// 添加请求拦截器
Service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 启动全局的loading
    Store.AppLoading.changeAppLoading(true)
    openAjaxNum += 1
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
Service.interceptors.response.use((response) => {
  // 关闭全局的loading
  openAjaxNum -= 1
  // 判断全部的请求都回来了，才关闭
  if (openAjaxNum === 0) {
    Store.AppLoading.changeAppLoading(false)
  }

  if (response && response.data && response.data.code === NO_LOGIN_CODE) {
    // const str = JSON.stringify(response.data)
    // alert('后端给前端399了,具体信息是-------' + str)
    mySessionStorageClear()
    window.location = response.data.data
  }
  else if (response && response.data && response.data.code === NO_AUTH_CODE) {
    // const str = JSON.stringify(response.data)
    // alert('后端给前端377了,具体信息是-------' + str)
    mySessionStorageClear()
    return response
  }
  else {
    return response
  }

}, (error) => {
  // 对响应错误做点什么
  // console.log('响应失败拦截器:', error)
  return Promise.reject(error)
})

/*
* 封装myAxios
*/
function myAxios(options) {
  // 1--method设置
  const method = options.method || 'get'

  // 2--url设置
  const url = options.url || ''

  // 3--params设置
  // 4--allowParamsEmptyString--params中是否允许出现空字符串
  // const time = Date.now()
  // const params = { ...{ _: time }, ...options.params }
  const params = { ...{}, ...options.params }
  if (options.allowParamsEmptyString) {
    for (const key in params) {
      if (params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    }
  } else {
    for (const key in params) {
      if (params[key] === null || params[key] === '' || params[key] === undefined) {
        delete params[key]
      }
    }
  }

  // 5--headers设置
  const headers = options.headers || defaultHeaders

  // 6--responseType设置
  // responseType响应的数据格式 json / blob /document /arraybuffer / text / stream
  const responseType = options.responseType || defaultResponseType


  // 7--data设置
  // 8--allowDataEmptyString--data中是否允许出现空字符串
  let data
  const optionsData = options.data
  if (options.allowDataEmptyString) {
    for (const key in optionsData) {
      if (optionsData[key] === null || optionsData[key] === undefined) {
        delete optionsData[key]
      }
    }
  } else {
    for (const key in optionsData) {
      if (optionsData[key] === null || optionsData[key] === '' || optionsData[key] === undefined) {
        delete optionsData[key]
      }
    }
  }

  if (method === 'get' || method === 'delete' || method === 'head') {
    data = null
  }
  else if ((method === 'post' || method === 'put' || method === 'patch') && headers['Content-Type'] === 'application/json;charset=UTF-8') {
    data = optionsData || {}
  }
  else if ((method === 'post' || method === 'put' || method === 'patch') && headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    data = qs.stringify(optionsData) || qs.stringify({})
  }

  // 9--onUploadProgress--上传的进度事件
  const onUploadProgress = options.onUploadProgress || function (progressEvent) {
    console.log('上传进度事件:', progressEvent)
  }

  // 10--onDownloadProgress--上传的进度事件
  const onDownloadProgress = options.onDownloadProgress || function (progressEvent) {
    console.log('导出进度事件:', progressEvent)
  }

  // 11--return什么出去
  // 默认resolve(res.data)，如果options.returnAll=true的话，就resolve(res)

  return new Promise((resolve, reject) => {
    Service({
      method,
      url,
      params,
      data,
      headers,
      responseType,
      onUploadProgress,
      onDownloadProgress,
    })
      .then((res) => {
        if (options.returnAll) {
          resolve(res)
        } else {
          if (res && res.data) {
            resolve(res.data)
          }
        }
      })
      .catch(err => reject(err))
  })
}

export { myAxios }

/*
 * 注意点
 */
/*
 * 1、token设置--下面这样设置，好像第一次请求，没办法带上token；
 * 解决办法是：在每个axios上面都写一遍，就可以带上，所以在这个地方写，没什么用
 * axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_gsp';
 *
 * 2、下面这样写，没什么鸟用，还是得用qs这个库
 * axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 */

/*
 * 使用示范
 */
// myAxios({
//   url: 'ddw-exchange-show/item-data',
//   method: 'get',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//     'Content-Type': 'application/json;charset=UTF-8',
//     Authorization: myLocalStorageGet('token', ''),
//     Token: 'q==sss',
//   },
//   allowParamsEmptyString: true
//   params: {
//     dimension: 'month',
//     name: '总计',
//     month: '2018-07'
//   },
//   allowDataEmptyString: true
//   data: {
//     sex: 'man',
//     chang: 'guan',
//   },
//   returnAll: true,
//   responseType: 'blob',
//   onUploadProgress: function (progressEvent) {
//     console.log('上传进度事件:', progressEvent)
//   },
//   onDownloadProgress: function (progressEvent) {
//     console.log('导出进度事件:', progressEvent)
//   }
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((res) => {
//     console.log(res)
//   })

