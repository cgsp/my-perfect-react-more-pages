import detect from 'mars-detect'

// 判断用户的设备和浏览器
export const myJudgeUserDeviceAndBrowserFromDetectLibrary = () => {
  const device = detect.os
  const { browser } = detect
  return {
    device,
    browser
  }
}

// 判断用户的设备是不是手机
export const myJudgeUserDeviceIsPhoneFromDetectLibrary = () => {
  console.log(detect)
  return detect.os.phone
}
