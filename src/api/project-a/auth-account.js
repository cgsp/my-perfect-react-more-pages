import { myAxios } from '@Api/my-axios'
import { baseServerApi } from './base-server-api'
// 该项目服务端API的前缀，如:http://www.baidu.com/
const baseApiUrl = baseServerApi

// 获取列表数据
export const apiAuthAccountList = (options) => {
  return myAxios(
    {
      baseApiUrl,
      url: 'user/list-users',
      method: 'GET',
      params: options,
      data: {},
    }
  )
}




