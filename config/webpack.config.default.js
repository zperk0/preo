var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function chunkSort (ca,cb){ //order scripts, angular and vendor first, then app last
  if (ca.names[0] == 'angular'){
    return -1
  }
  if (cb.names[0] == 'angular'){
    return 1
  }
  if (ca.names[0] == 'vendor'){
    return -1
  }
  if (cb.names[0] == 'vendor'){
    return 1
  }
   if (ca.names[0] == 'app'){
    return 1
  }
  if (cb.names[0] == 'app'){
    return -1
  }
  if ( ca.names[0] < cb.names[0]){
    return -1
  } else {
    return 1;
  }

};

module.exports = function(ENV, options) {
  return {
    /**
     * Resolve
     * Make bower_components available for the resolvers
     */
    resolve: {
      root: [
        path.join(__dirname, "./bower_components"),
        path.resolve(__dirname, '..', 'client')
      ],
      alias: {
        appConstants: "./" + ENV + ".constants.js"
      }
    },
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    entry: {
      angular:['angular'],
      app: './client/app/app.js',
      outlets: './client/app/features/main/dashboard/outlets/index.js',
      menus: './client/app/features/main/dashboard/menus/index.js',
      bookings: './client/app/features/main/dashboard/bookings/index.js',
      events: './client/app/features/main/dashboard/events/index.js',
      notifications: './client/app/features/main/dashboard/notifications/index.js',
      payments: './client/app/features/main/dashboard/payments/index.js',
      promotions: './client/app/features/main/dashboard/promotions/index.js',
      styling: './client/app/features/main/dashboard/styling/index.js',
      venueSettings: './client/app/features/main/dashboard/venueSettings/index.js',
      vouchers: './client/app/features/main/dashboard/vouchers/index.js',
      taxes: './client/app/features/main/dashboard/taxes/index.js',
      analytics: './client/app/features/main/dashboard/analytics/index.js',
      manageUsers: './client/app/features/main/dashboard/manageUsers/index.js',
      updateExternalMenus: './client/app/features/main/dashboard/updateExternalMenus/index.js',
      customTags: './client/app/features/main/dashboard/customTags/index.js',
      vendor: './client/app/vendor.js'
    },
    /**
     * ESLint
     * use the .eslint config
     * optionally enable autofix to force rules
     */
    eslint: {
      configFile: '.eslintrc',
      //fix: true
    },
    /**
     * Output
     * Reference: http://console.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output: {
      // Absolute output directory
      path: __dirname + '/../dist',
      publicPath: 'http://localhost:' + options.devServerPort+"/",
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    /**
     * Devtool settings
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: '#source-map',
    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],
    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      contentBase: '../dist',
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false,
        inline: true,
        progres: true,
        hot: true
      },
      port: options.devServerPort
    },
    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    module: {
      noParse: /node_modules\/jscore\/preoday\/preoday.min.js/,
      preloaders: [],
      loaders: [{
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        test: /\.(js|jsx)$/,
        loaders: ['ng-annotate','babel'],
        // exclude: [/node_modules/, /bower_components/]
      },
      {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: "file-loader?name=[name].[ext]"
      }, {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw'
      },
       {
        test: /\.css$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        //
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development for hot-loading
        loader: ExtractTextPlugin.extract('style',
          'css?sourceMap!postcss')
      },
      {
       // Sass Loader
       test: /\.scss$/,
       loaders: ["style", "css", "sass"]
      },
      {
        // ESLint loader
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: [/node_modules/, /bower_components/]
      },
      { test: require.resolve("tinycolor2"), loader: "expose?tinycolor" }
      ]
    },
    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].css', {
      }),
      new CopyWebpackPlugin([
        { from: 'client/v1/v1.css', to:'v1.css'},
        { from: 'client/stripe-success.php', to:'stripe-success.php'},
        { from: 'client/assets'},
      ]),
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
          "../bower.json", ["main"])
      ),
      new HtmlWebpackPlugin({
        template:'./client/index.html',
        chunksSortMode: chunkSort,
        chunks:['bookings', 'events', 'analytics', 'notifications', 'payments', 'promotions', 'manageUsers', 'styling', 'venueSettings', 'vouchers', 'menus','outlets','taxes', 'updateExternalMenus', 'customTags', 'app','vendor'],
        // chunks:['outlets','app','vendor'],
        filename:'index.html'
      }),
    ]
  }
}


