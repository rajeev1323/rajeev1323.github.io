const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

var srcPath = path.join(__dirname, "./src");
var destPath = path.join(__dirname, "./public");

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: srcPath + '/entry.js',
  },
  mode: 'development',
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: isDevelopment ? '[id].js' : '[id].[Chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/static/'
  },
  plugins: [
    new CopyPlugin({
    	patterns: [
      { from: './node_modules/html5-qrcode/dist/*.js', to: `${destPath}/[name][ext]`},
      { from: './src/styles.css', to: `${destPath}/[name][ext]`}]
    }),
  ],
  resolve: {
    extensions: ['.js', '.css']
  },
  devtool: 'source-map',
};