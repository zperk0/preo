var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var path = require("path");
var fs = require('fs');
var cssOverride = '';
var cssOverridePath = process.cwd() + '/client/assets/overrides/';

module.exports = function(ENV, options) {

  if (fs.existsSync(cssOverridePath + options.override + '/override.css')) {
    cssOverride = fs.readFileSync(cssOverridePath + options.override + '/override.css', 'utf8');
  }

  return {
    devServer:{
      proxy: {
        '/api/*': {
          changeOrigin: true,
          target: 'http://local.app.preoday.com/'
        },
      },
      historyApiFallback: {
        rewrites: [
          // this is to allow navigate with /channel url in serve version.
          // if you need to have a channel folder or something like that
          // we can try to change the way how it works to it: https://github.com/ReactTraining/react-router/issues/676
          {from: /.*\.html/, to: '/index.html'}
        ]
      },
    },
    module: {
      loaders: [
        {
          test: /index\.html/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /\<\!\-\- @@OVERRIDES \-\-\>/ig,
                replacement: function (match, p1, offset, string) {
                  var overrides = "<script>";
                  overrides += "window._PREO_DATA = {";
                  overrides += "_CDNROOT : 'http://cdn-local.preoday.com/',",
                  overrides += "_WEBORDERS : 'http://localhost:3000/',",
                  overrides += "_WEBORDERS_EDIT : 'http://localhost:3000/',",
                  overrides += "_ORDERSAPP : 'http://local.orders.preoday.com/',",
                  overrides += "_WEBAPP_V1 : 'http://local.app.preoday.com/',",
                  overrides += "_BASE_URL : 'http://local.app.preoday.com',",
                  overrides += "_DOMAIN : 'preoday',",
                  overrides += "_IS_CHANNEL : false",
                  overrides += "};";
                  overrides += "</script>";
                  return overrides;
                }
              },
              {
                pattern: /@@FAVICON/ig,
                replacement: function (match, p1, offset, string) {
                  const CDN_ROOT = 'http://cdn-local.preoday.com/images/';
                  const FAV_ICON = '/favicon.ico';

                  return CDN_ROOT + options.override + FAV_ICON;
                }
              },
              {
                pattern: /\<\!\-\- @@CSSOVERRIDE \-\-\>/ig,
                replacement: function (match, p1, offset, string) {
                  if (cssOverride) {
                    return '<style>'+ cssOverride + '</style>';
                  }
                  return cssOverride;
                }
              },
              {
                // Change `cdn/images/` for cdn root url (local)
                pattern: /cdn\//g,
                replacement: function (match, p1, offset, string) {
                  return 'http://cdn-local.preoday.com/';
                }
              },
              {
                pattern: /\<\!\-\- @@BUILD \-\-\>/ig,
                replacement: function (match, p1, offset, string) {

                  // <script>
                  // (function() {
                  // var url = window.location.href;

                  // if (url.indexOf('/channel') !== -1) {
                  //   window._PREO_DATA._IS_CHANNEL = true;
                  // }
                  // )();
                  // </script>

                  return '<script>(function(){var url=window.location.href;-1!==url.indexOf("/channel")&&(window._PREO_DATA._IS_CHANNEL=!0);})();</script>';
                }
              },
            ]
          })
        }
      ]
    },
    plugins : [
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3030,
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
      ),
      new StringReplacePlugin(),
    ]
  }
}
