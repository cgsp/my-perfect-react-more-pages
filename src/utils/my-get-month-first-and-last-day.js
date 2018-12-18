// 传入时间戳，获取， 这个时间戳对应时间的，月份的, 前一个月，的第一天的0时，0分，0秒
const myGetBeforeMonthFirstDayFirstMemont = (timestamp) => {
  const date = new Date(timestamp)
  const nowMonth = date.getMonth()
  let targetMonth, targetYear
  const nowYear = date.getFullYear()
  if (nowMonth === 0) {
    targetMonth = 11
    targetYear = nowYear - 1
  } else {
    targetMonth = nowMonth - 1
    targetYear = nowYear
  }
  date.setFullYear(targetYear)
  date.setMonth(targetMonth)
  date.setDate(1)
  date.setHours(0)
  date.setSeconds(0)
  date.setMinutes(0)
  const newTimestamp = date.valueOf()
  return newTimestamp
}

// 传入时间戳，获取， 这个时间戳对应时间的，月份的,前一个月的，最后一天的23时，59分，59秒
const myGetBeforeMonthLastDayLastMemont = (timestamp) => {
  const date = new Date(timestamp)
  const nowMonth = date.getMonth()
  const nowYear = date.getFullYear()
  let targetMonth, targetYear
  if (nowMonth === 0) {
    targetMonth = 0
    targetYear = nowYear
  } else {
    targetMonth = nowMonth
    targetYear = nowYear
  }
  date.setFullYear(targetYear)
  date.setMonth(targetMonth)
  date.setDate(1)
  date.setHours(23)
  date.setSeconds(59)
  date.setMinutes(59)
  const newTimestamp = date.valueOf() - 1000 * 60 * 60 * 24
  return newTimestamp
}

export { myGetBeforeMonthFirstDayFirstMemont, myGetBeforeMonthLastDayLastMemont }
