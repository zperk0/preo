var webpack = require('webpack');
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin');
const ROLLBAR_POST_SERVER = 'eae81354dbed4493a20f9b7346af8bc9';
const release = 'webapp-v2 1.0.26';

var plugins =  [new webpack.NoErrorsPlugin(),
                new CopyWebpackPlugin([
                  { from: 'client/index.php'},
                  { from: 'client/.htaccess'},
                  { from: 'client/stripe-success.php', to:'payments/stripe-success.php'}
                ]),
                new webpack.optimize.DedupePlugin()]

var removeLogOption = [new webpack.optimize.UglifyJsPlugin({compress:{drop_console: true}})];

module.exports = function(ENV, removeLogs) {

  if (removeLogs) {
    plugins = plugins.concat(removeLogOption);
  }

  var public_path = '';
  if(ENV === 'dev'){
    public_path = 'https://app-dev.preoday.com';
  } else if(ENV === 'demo') {
    public_path = 'https://app-demo.preoday.com';
  } else if(ENV === 'prod') {
    public_path = 'https://app.preoday.com';
  } else {
    public_path = 'http://localhost';
  }

  var rollbarPlugin = [new RollbarSourceMapPlugin({
          accessToken: ROLLBAR_POST_SERVER,
          version: release,
          publicPath: public_path
      })];

  if(ENV === 'dev' || ENV === 'demo' || ENV === 'prod') {
    plugins = plugins.concat(rollbarPlugin);
  }

  return {
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    //context: path.resolve(__dirname),
    /**
     * Output
     * Reference: http://console.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output: {
      // Absolute output directory
      path: __dirname + '/../dist',
      publicPath: '/',
      filename: '[name].bundle.[chunkhash].js',
      chunkFilename: '[name].bundle.[chunkhash].js'
    },
    /**
     * Devtool settings
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: 'source-map',
    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: plugins

  }
}
