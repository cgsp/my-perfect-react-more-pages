'use strict'

const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

/**
 * 相对于单页应用
 * 新增utils方法
 */
const utils = require('./utils')

// 覆盖ant-mobile主题
const resetAntdTheme = require('../reset-antd-theme.json')

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './'
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1)
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)

// 是否删除debugger
const isDropDebugger = process.env.REACT_APP_BUILD_ENV === 'production' ? true : false
// 是否删除console
const isDropConsole = process.env.REACT_APP_BUILD_ENV === 'production' ? true : false

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

// Note: defined here because it will be used more than once.
// const cssFilename = 'static/css/[name].[chunkhash:8].css'
const cssFilename = 'static/css/[name].[contenthash:8].css'

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  // devtool: shouldUseSourceMap ? 'source-map' : false,
  devtool: false,
  // In production, we only want to load the polyfills and the app code.
  // entry: [require.resolve('./polyfills'), paths.appIndexJs],
  // 相对于单页应用-修改
  entry: Object.assign({}, {
    vendor: [
      'antd',
      'axios',
      'js-cookie',
      'good-storage',
      'mobx',
      'mobx-react',
      'moment',
      'qs',
      'querystring',
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
    // 改动后:入口会自动扫描生成,直接在src/views/目录下新建入口js文件即可
    utils.getEntriesProd()
  ),
  // entry: {
  //   vendor: [
  //     'antd',
  //     'axios',
  //     'js-cookie',
  //     'good-storage',
  //     'mobx',
  //     'mobx-react',
  //     'moment',
  //     'qs',
  //     'querystring',
  //     'react',
  //     'react-dom',
  //     'react-router-dom',
  //   ],
  //   app: [
  //     require.resolve('./polyfills'),
  //     paths.appIndexJs,
  //   ],
  // },
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:12].js',
    // filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].[chunkhash:12].chunk.js',
    // chunkFilename: 'static/js/[name].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: [
      '.web.js',
      '.mjs',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.scss'
    ],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      '@Api': path.join(__dirname, '..', 'src/api'),
      '@Assets': path.join(__dirname, '..', 'src/assets'),
      '@Components': path.join(__dirname, '..', 'src/components'),
      '@Constants': path.join(__dirname, '..', 'src/constants'),
      '@Pages': path.join(__dirname, '..', 'src/pages'),
      '@Router': path.join(__dirname, '..', 'src/router'),
      '@Store': path.join(__dirname, '..', 'src/store'),
      '@Utils': path.join(__dirname, '..', 'src/utils'),
      '@Views': path.join(__dirname, '..', 'src/views'),
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter
              // eslintPath: require.resolve('eslint'),
            },
            loader: 'eslint-loader'
            // loader: require.resolve('eslint-loader'),
          }
        ],
        include: paths.appSrc
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:12].[ext]'
            }
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              // antd按需加载组件
              plugins: [
                'babel-plugin-transform-decorators-legacy',
                [
                  'import',
                  // { libraryName: 'antd', libraryDirectory: 'es', style: true },
                  { libraryName: 'antd-mobile', libraryDirectory: 'es', style: true },
                ]
              ]
            }
          },
          // The notation here is somewhat confusing.
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader normally turns CSS into JS modules injecting <style>,
          // but unlike in development configuration, we do something different.
          // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
          // (second argument), then grabs the result CSS and puts it into a
          // separate file in our build process. This way we actually ship
          // a single CSS file in production instead of JS code injecting <style>
          // tags. If you use code splitting, however, any async bundles will still
          // use the "style" loader inside the async code so CSS from them won't be
          // in the main CSS file.
          {
            test: /\.(css|scss)$/,
            exclude: [
              /node_modules/,
              /src\/assets/,
            ],  // 不处理node_modules和assets目录
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                        // 改动
                        modules: true,   // 新增对css modules的支持
                        localIdentName: '[name]__[local]__[hash:base64:12]', //
                      }
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9' // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009'
                          })
                        ]
                      }
                    },
                    {
                      loader: require.resolve('sass-loader')
                    }
                  ]
                },
                extractTextPluginOptions
              )
            )
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          /**
           * assets目录专用,
           */
          {
            test: /\.(css|scss)$/,
            include: [
              /src\/assets/,
            ],  // 只处理assets目录
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    },
                    {
                      loader: require.resolve('sass-loader'),
                    }
                  ],
                },
                extractTextPluginOptions
              )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          /**
           * node_modules目录专用,
           * 其实下面，需要具体到node_modules下面的antd的具体的包，但是cnpm安装和npm安装，这个包的位置不太一样
           * 如:ant-mobile,单独开启css/less编译,不带css模块化;
           * 配置覆盖ant-mobile主题;
           */
          {
            test: /\.(css|less)$/,
            include: [
              /node_modules/,
            ],  // 只处理node_modules目录
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    },
                    {
                      loader: require.resolve('less-loader'),
                      options: {
                        // 覆盖ant-mobile主题
                        modifyVars: resetAntdTheme,
                        include: /node_modules/,
                        javascriptEnabled: true,
                      },
                    }
                  ],
                },
                extractTextPluginOptions
              )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:12].[ext]'
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    // 自动加载模块，而不必到处 import 或 require.
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      PropTypes: 'prop-types',
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    // 相对于单页应用-修改
    // 自动扫描html模版,生成new HtmlWebpackPlugin()配置
    ...utils.getHtmlWebpackPluginsProd(),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   chunks: ['manifest', 'vendor', 'index'],
    //   template: paths.appHtml,
    //   filename: 'index.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    // }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: paths.appHtml,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true
    //   }
    // }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: isDropDebugger,  // 去除debugger
        drop_console: isDropConsole,   // 去除console
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true
      },
      sourceMap: shouldUseSourceMap
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return
        }
        console.log(message)
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 相对于单页应用-修改
    /**
     * 抽取vendor包(采用了和vue-cli相同的方案):
     *  1.想要多入口,js、css文件的hash采用[chunkhash]才能保证文件hash不每次都变化;
     *    [ 一个坑点: 修改js的内容,css文件的hash会跟着变化!
     *      解决: css文件的hash,既不是[hash]也不是[chunkhash],而是[contenthash] !! 
     *           js文件仍然采用[chunkhash] !!
     *           (这可以保证js和css有各自不同的文件hash,而且各自的修改不会相互影响hash值 !!) ]
     *  2.需要抽取manifest.js,记录模块间依赖关系;
     *  3.使用HashedModuleIdsPlugin()去改变webpack默认的chunk id命名;
     */
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor',
      // filename: 'static/js/[name].[chunkhash:8].js',
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    // 使用和顺序无关的模块命名方式
    new webpack.HashedModuleIdsPlugin(),
    // 下面这个common，其实更加适合多页应用时候的打包，spa其实用的很少，也起不到什么作用，反而会分散请求
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'static/js/[name].[chunkhash:8].js',
    //   minChunks: 2
    // })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
