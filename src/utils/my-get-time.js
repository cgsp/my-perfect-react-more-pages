import moment from 'moment'

const myGetStrTime = (timestamp) => {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

const myGetStampTime = (str) => {
  return new Date(str).valueOf()
}

// 将时间对象转换为时间戳
const myTransTimeObjToStampTime = (date) => {
  if (date) {
    return myGetStampTime(date)
  }
  return date
}

// 根据时间字符串，20180702,判断是否超过了31天
export const isBigThan31 = (beginStr, endStr) => {
  if (!beginStr || !endStr) {
    return true
  }
  const timeAmount31 = 31 * 24 * 60 * 60 * 1000
  let begin = new Date()
  let end = new Date()
  begin.setFullYear(beginStr.slice(0, 4) - 0, beginStr.slice(4, 6) - 0, beginStr.slice(6, 8) - 0)

  end.setFullYear(endStr.slice(0, 4) - 0, endStr.slice(4, 6) - 0, endStr.slice(6, 8) - 0)

  const temp = end.valueOf() - begin.valueOf()
  // console.log(begin)
  // console.log(end)
  // console.log(temp)
  // console.log(timeAmount31)
  if (temp > timeAmount31) {
    return true
  }
  return false
}

// 根据时间字符串，20180702,20180812,获取2个时间之间的日期天['2018-07-02','2018-07-03'...]
export const getDateStrBetton = (beginStr, endStr) => {
  let dateBettonArr = []
  if (!beginStr || !endStr) {
    return dateBettonArr
  }
  const timeAmount = 24 * 60 * 60 * 1000
  let begin = new Date()
  let end = new Date()
  begin.setFullYear(beginStr.slice(0, 4) - 0, beginStr.slice(4, 6) - 1, beginStr.slice(6, 8) - 0)

  end.setFullYear(endStr.slice(0, 4) - 0, endStr.slice(4, 6) - 1, endStr.slice(6, 8) - 0)

  let beginValue = begin.valueOf()
  const endValue = end.valueOf()

  dateBettonArr.push(moment(beginValue).format('YYYY-MM-DD'))

  const length = (endValue - beginValue) / timeAmount

  for (let index = 0; index < length; index++) {
    const item = beginValue + timeAmount
    const date = moment(item).format('YYYY-MM-DD')
    dateBettonArr.push(date)
    beginValue = item
  }

  return dateBettonArr
}

export { myGetStrTime, myGetStampTime, myTransTimeObjToStampTime }
