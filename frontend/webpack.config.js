const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '/public/js/'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      },

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: 'public/index.html'
  })
]
};
