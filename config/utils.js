/* 
 * @Desc: Desc: webpack多页构建相关工具函数
    1.自动扫描入口js,生成entry入口配置;
    2.自动扫描html模版,生成new HtmlWebpackPlugin()配置;
 * @Author: John.Guan 
 * @Date: 2018-12-18 17:08:24 
 * @Last Modified by: John.Guan 
 * @Last Modified time: 2018-12-18 17:08:24 
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appDirectory = fs.realpathSync(process.cwd()) // 项目根路径

/**
 * 获取文件
 * @param {String} filesPath 文件目录
 * @returns {Object} 文件集合(文件名: 文件路径)
 */
const getFiles = filesPath => {
  let files = glob.sync(filesPath)
  let obj = {}
  let filePath, basename, extname

  for (let i = 0; i < files.length; i++) {
    filePath = files[i]
    extname = path.extname(filePath) // 扩展名 eg: .html
    basename = path.basename(filePath, extname) // 文件名 eg: index
    // eg: { coupon: '/src/views/coupon/coupon.js' }
    obj[basename] = path.resolve(appDirectory, filePath)
  }
  return obj
}

/**
 * 打包入口
 *  1.允许文件夹层级嵌套;
 *  2.入口js的名称不允许重名;
 */
const entries = getFiles('src/views/**/*.js')

/**
 * 页面的模版
 *  1.允许文件夹层级嵌套;
 *  2.html的名称不允许重名;
 */
const templates = getFiles('src/views/**/*.html')

/**
 * 获取webpack.config.dev.js的entry入口列表:
 *  1.允许文件夹层级嵌套;
 *  2.入口的名称不允许重名;
 *
 * @returns {Object} entry 入口列表(对象形式)
 */
const getEntriesDev = () => {
  let entry = {}

  for (let name in entries) {
    entry[name] = [
      require.resolve('./polyfills'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      entries[name],
    ]
  }
  return entry
}

/**
 * 获取webpack.config.prod.js的entry入口列表:
 *  1.允许文件夹层级嵌套;
 *  2.入口的名称不允许重名;
 *
 * @returns {Object} entry 入口列表(对象形式),不包含vendor和manifest
 */
const getEntriesProd = () => {
  let entry = {}

  for (let name in entries) {
    entry[name] = [
      require.resolve('./polyfills'),
      entries[name],
    ]
  }
  return entry
}

/**
 * 生成webpack.config.dev.js的plugins下new HtmlWebpackPlugin()配置
 * @returns {Array} new HtmlWebpackPlugin()列表
 */
const getHtmlWebpackPluginsDev = () => {
  let htmlWebpackPlugins = []
  let setting = null

  for (let name in templates) {
    setting = {
      filename: `${name}.html`,
      template: templates[name],
      inject: false, // js插入的位置，true/'head'/'body'/false
    }

    // (仅)有入口的模版自动引入资源
    if (name in getEntriesDev()) {
      setting.chunks = [name]
      setting.inject = true
      // setting.favicon = './src/assets/img/favicon.ico'
      // setting.hash = true
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin(setting))
    setting = null
  }

  return htmlWebpackPlugins
}

/**
 * 生成webpack.config.prod.js的plugins下new HtmlWebpackPlugin()配置
 * @returns {Array} new HtmlWebpackPlugin()列表
 */
const getHtmlWebpackPluginsProd = () => {
  let htmlWebpackPlugins = []
  let setting = null

  for (let name in templates) {
    setting = {
      filename: `${name}.html`,
      template: templates[name],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: false, // js插入的位置，true/'head'/'body'/false
    }

    // (仅)有入口的模版自动引入资源
    if (name in getEntriesProd()) {
      setting.chunks = ['manifest', 'vendor', name]
      setting.inject = true
      // setting.favicon = './src/assets/img/favicon.ico'
      // setting.hash = true
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin(setting))
    setting = null
  }

  return htmlWebpackPlugins
}

module.exports = {
  entries, // 入口文件(对象 => 文件名: 文件路径)
  templates, // html模版文件(对象 => 文件名: 文件路径)
  getEntriesDev, // 生成dev环境entry入口配置
  getEntriesProd, // 生成prod环境entry入口配置
  getHtmlWebpackPluginsDev, // 生成dev环境html-webpack-plugin配置
  getHtmlWebpackPluginsProd, // 生成prod环境html-webpack-plugin配置
}
