// 补0操作：如果是1,补充为01
const myPad = (num, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

// 将数字80s，转变为01:20
const myTransSecondsToTime = (interval) => {
  interval = interval | 0
  const minute = interval / 60 | 0
  const minuteTemp = myPad(minute, 2)
  const second = interval % 60
  const secondTemp = myPad(second, 2)
  return `${minuteTemp}:${secondTemp}`
}

export { myTransSecondsToTime }
