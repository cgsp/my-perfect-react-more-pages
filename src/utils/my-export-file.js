import Store from '@Store'
import jsDownload from 'js-file-download'
import { message } from 'antd'
import { myAxios } from '@Api/my-axios'

// 处理导出进度条的函数
let timer = null
let appDownProcessCallBack = (progressEvent) => {
  let percentCompleted
  if (progressEvent.lengthComputable) {
    percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    if (percentCompleted === 100) {
      Store.AppLoading.changeAppDownPercentLoading(true, 100)
      if (timer) {
        clearTimeout(timer)
      }
      // 为了一个迟缓的效果
      timer = setTimeout(() => {
        Store.AppLoading.changeAppDownPercentLoading.changeDownPercentLoading(false, 100)
      }, 250)
    } else {
      Store.AppLoading.changeAppDownPercentLoading.changeDownPercentLoading(true, percentCompleted)
    }
  } else {
    Store.AppLoading.changeAppDownPercentLoading.changeDownPercentLoading(false, 100)
    message.error('文件有误，或文件长度不可计算')
  }
}


export const myExportFile = (url, paramsObj) => {
  if (!url) {
    message.error('请输入导出url')
    return
  }

  paramsObj = paramsObj || {}

  myAxios(
    {
      url,
      method: 'POST',
      params: {},
      data: paramsObj,
      responseType: 'blob',
      onDownloadProgress(progressEvent) {
        appDownProcessCallBack(progressEvent)
      },
      returnAll: true
    }
  )
    .then(res => {
      // console.log(res)
      // 这里res.data是返回的blob对象
      // console.log(res.headers['content-disposition'])
      const fileNameString = res.headers['content-disposition'] || 'file=导出文件.xlsx'
      let filename = fileNameString.split('=')[1]
      filename = decodeURI(filename)
      jsDownload(res.data, filename)
    })
}

// res = res.data
// var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
// var blob = new Blob([res.data], { type: 'application/vnd.ms-excel' }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
// var downloadElement = document.createElement('a');
// var href = window.URL.createObjectURL(blob); // 创建下载的链接
// downloadElement.href = href;
// downloadElement.download = '商务渠道.xlsx'; // 下载后文件名
// document.body.appendChild(downloadElement);
// downloadElement.click(); // 点击下载
// document.body.removeChild(downloadElement); // 下载完成移除元素
// window.URL.revokeObjectURL(href); // 释放掉blob对象 
// download(res.data, 'Detail_Blast.xls')

