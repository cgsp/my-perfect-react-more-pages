import { myAxios } from '@Api/my-axios'

// 获取列表数据
export const apiAuthAccountList = (options) => {
  return myAxios(
    {
      url: '/user/list-users',
      method: 'GET',
      params: options,
      data: {},
    }
  )
}

// 编辑
export const apiAuthAccountUpdateRole = (options) => {
  return myAxios(
    {
      url: '/user/user-bind-role',
      method: 'POST',
      params: {},
      data: options,
    }
  )
}

// 删除
export const apiAuthAccountDeleteRole = (id) => {
  return myAxios(
    {
      url: '/user/clean-roles-under-user',
      method: 'POST',
      params: {},
      data: { userId: id },
    }
  )
}



