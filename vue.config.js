let path = require('path');
const webpack = require('webpack');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil');
const { resolveCss } = require('./src/utils/theme-color-replacer-extend');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

const isProd = process.env.NODE_ENV === 'production';

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    nprogress: 'NProgress',
    clipboard: 'ClipboardJS',
    'js-cookie': 'Cookies'
  },
  css: [],
  js: [
    '//cdn.tdctech.cn/js/libs/vue/2.6.11/vue.min.js',
    '//cdn.tdctech.cn/js/libs/vue-router/3.4.0/vue-router.min.js',
    '//cdn.tdctech.cn/js/libs/vuex/3.4.0/vuex.min.js',
    '//cdn.tdctech.cn/js/libs/axios/0.19.2/axios.min.js',
    '//cdn.tdctech.cn/js/libs/nprogress/0.2.0/nprogress.min.js',
    '//cdn.tdctech.cn/js/libs/clipboard/2.0.6/clipboard.min.js',
    '//cdn.tdctech.cn/js/libs/js-cookie/2.2.1/js.cookie.min.js'
  ]
};

module.exports = {
  // publicPath: 'http://localhost:8081/',
  devServer: {
    port: 3303,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api/'
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/theme.less')]
    }
  },
  configureWebpack: (config) => {
    config.entry.app = ['whatwg-fetch', './src/main.js'];
    config.performance = {
      hints: false
    };
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    );
    // Ignore all locale files of moment.js
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    // if prod, add externals
    if (isProd) {
      config.externals = assetsCDN.externals;
    }
  },
  chainWebpack: (config) => {
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (isProd) {
      config.plugin('optimize-css').tap((args) => {
        args[0].cssnanoOptions.preset[1].colormin = false;
        return args;
      });
    }
    // 生产环境下使用CDN
    if (isProd) {
      config.plugin('html').tap((args) => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  assetsDir: 'static',
  productionSourceMap: false
};
