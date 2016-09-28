var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require("path");

module.exports = function(ENV, options) {
  return {
    devServer:{
      proxy: {
        '/api/*': {
          changeOrigin: true,
          target: 'http://local.app.preoday.com/'
        },
        '/cdn/*': {
          changeOrigin: true,
          target: 'http://cdn-local.preoday.com/',
          pathRewrite: {'^/cdn/' : '/'}
        }
      }
    },
    plugins : [
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3001,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: 'http://localhost:'+options.devServerPort
        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: false
        }
      )
    ]
  }
}
