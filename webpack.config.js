var argv = require('yargs').argv;
var webpack = require('webpack');
var path = require('path');
var debug = require('debug')('app:config:webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanupPlugin = require('webpack-cleanup-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Environment Constants
var NODE_ENV = process.env.NODE_ENV;
var API_ENDPOINT = JSON.stringify(process.env.API_ENDPOINT);
var APP_URL = JSON.stringify(process.env.APP_URL);
var __DEV__ = NODE_ENV === 'development';
var __PROD__ = NODE_ENV === 'production';
var __TEST__ = NODE_ENV === 'test';
var __COVERAGE__ = !argv.watch && __TEST__;
var __BASENAME__ = JSON.stringify(process.env.BASENAME || '');
var GLOBALS = {
  'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
  NODE_ENV: NODE_ENV,
  __DEV__: __DEV__,
  __PROD__: __PROD__,
  __TEST__: __TEST__,
  __COVERAGE__: __COVERAGE__,
  __BASENAME__: __BASENAME__
};

// Constants
var ROOT = path.resolve(__dirname);
var DIST = path.join(ROOT, 'dist');
var SRC = path.join(ROOT, 'src');
var PROJECT_PUBLIC_PATH = '/';

// Base Configuration
var webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  resolve: {
    modules: [ SRC, 'node_modules' ],
    extensions: ['.ts', '.js', '.json']
  },
  module: { rules: [] }
};

// Entry
var APP_ENTRY = path.join(SRC, 'app.ts');
var WEBPACK_DEV_SERVER = `webpack-dev-server/client?path=${PROJECT_PUBLIC_PATH}`
webpackConfig.entry = {
  app: __DEV__
    ? [WEBPACK_DEV_SERVER, APP_ENTRY]
    : [APP_ENTRY],
  vendor: [
    '@cycle/run',
    '@cycle/http',
    '@cycle/history',
    '@cycle/isolate',
    '@cycle/dom',
    'xstream',
    'typestyle',
    'switch-path',
    'ramda'
  ]
};

// Output
webpackConfig.output = {
  filename: `[name].[hash].js`,
  path: DIST,
  publicPath: PROJECT_PUBLIC_PATH
};

// Plugins
webpackConfig.plugins = [
  new webpack.DefinePlugin(GLOBALS),
  new CleanupPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(SRC, 'index.html'),
    hash: false,
    favicon: path.join(SRC, 'favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: { collapseWhitespace: true }
  }),
  new CopyWebpackPlugin([
    { from: 'src/images', to: 'images' },
    { from: 'src/fonts', to: 'fonts' }
  ])
];

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurrenceOrder & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

// Rules
function addRules(rules) {
  webpackConfig.module.rules = webpackConfig.module.rules.concat(rules);
}
// TypeScript and source maps
addRules([
  { test: /\.ts$/, loader: 'ts-loader' },
  { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre', exclude: [path.join(ROOT, 'node_modules')] }
]);

module.exports = webpackConfig;
