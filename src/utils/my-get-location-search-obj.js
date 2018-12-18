export const myGetLocationSearchObj = () => {
  const { href } = window.location
  const index = href.indexOf('?')
  if (index === -1) {
    return {}
  }
  const paramsString = href.substr(index + 1)
  console.log(paramsString)
  let params = {}
  const arr = paramsString.split('&')
  arr.forEach(item => {
    const key = item.split('=')[0]
    let value = item.split('=')[1]
    if (value === 'true') {
      value = true
    }
    if (value === 'false') {
      value = false
    }
    if (!params[key]) {
      params[key] = value
    }
  })
  return params
}
