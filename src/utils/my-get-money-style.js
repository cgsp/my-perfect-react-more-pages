export const myGetMoneyStyle = (str, dotNum) => {
  if (str === null || str === undefined) {
    str = 0
  }
  dotNum = dotNum || 2
  str = (str - 0).toFixed(dotNum)
  const dotAndAfter = '.' + str.split('.')[1]
  const num = str.split('.')[0]
  let newNum = num.split('').reverse()

  for (var i = 0; i < newNum.length; i++) {
    if ((i + 1) % 4 === 0) {
      newNum.splice(i, 0, ',')
    }
  }
  newNum.reverse()

  let result = ''
  for (var j = 0; j < newNum.length; j++) {
    result += newNum[j]
  }

  return (result + dotAndAfter)
}
