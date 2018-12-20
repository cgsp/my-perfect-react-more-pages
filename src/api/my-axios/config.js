import http from 'http'
import https from 'https'

let baseApiUrl = ''
let headers = {
  'Content-Type': 'application/json;charset=UTF-8',
}
switch (process.env.REACT_APP_BUILD_ENV) {
  case 'development':
    headers['Index-Url'] = 'http://localhost:3000'
    break
  default:
    break
}
const responseType = 'text'

const config = {
  baseURL: baseApiUrl,
  // 跨域的时候，允许服务端设置cookies
  withCredentials: true,
  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 用于node.js
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
}

export { config, headers, responseType }
