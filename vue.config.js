'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Cloud Component ' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 3002 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production'? '.': '/' ,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // open: true,

    proxy: {
      '/v1': {
        target: process.env.VUE_APP_BASE_HOST,
        pathRewrite: {
          // '^/api': '/'
        },
      },
    },
    // before: require('./mock/mock-server.js')
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          mode: "icss",//https://github.com/webpack-contrib/css-loader#separating-interoperable-css-only-and-css-module-features
        },
      }
    }
  },
  configureWebpack: {
        //process: {env: {}},
        plugins: [
          // fix "process is not defined" error:
          // (do "npm install process" before running the build)
          new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
      ],
      resolve: {
        alias: {
          '@': resolve('src'),
        },
        fallback: {
          console: require.resolve('console-browserify'),
          https: require.resolve('https-browserify'),
          path: require.resolve('path-browserify'),
          querystring: require.resolve('querystring-es3'),
          stream: require.resolve('stream-browserify'),
          sys: require.resolve('util'),
          url: require.resolve('url'),
          util: require.resolve('util'),

        },
      },
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,

  },
  chainWebpack(config) {

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },
}
