/* 
 * @Desc: Js最全面的判断数据类型的方法
 * @Author: John.Guan 
 * @Date: 2018-11-22 14:41:50 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-11-22 14:45:59
 */

export const myDataType = (data) => {
  const type = toString.call(data)
  let result
  switch (type) {
    case '[object Number]':
      result = 'number'
      break
    case '[object String]':
      result = 'string'
      break
    case '[object Boolean]':
      result = 'bool'
      break
    case '[object Array]':
      result = 'array'
      break
    case '[object Object]':
      result = 'obj'
      break
    case '[object Null]':
      result = 'null'
      break
    case '[object Undefined]':
      result = 'undefined'
      break
    default:
      break
  }
  return result
}
