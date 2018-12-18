/* 
 * @Desc: 冻结对象
 * @Author: John.Guan 
 * @Date: 2018-12-03 16:14:16 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-12-03 16:22:59
 */

// const foo = Object.freeze({})
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
// foo.prop = 123

import { myDataType } from '@Utils/my-data-type'
// 将一个对象彻底冻结
const myFreezeObj = (obj) => {
  Object.freeze(obj)
  Object.keys(obj).forEach(key => {
    if (myDataType(obj[key]) === 'obj') {
      myFreezeObj(obj[key])
    }
  })
}

export { myFreezeObj }
