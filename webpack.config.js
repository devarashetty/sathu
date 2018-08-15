var path = require('path')
module.exports = {
  entry: './index.js',
  output:{
    path:path.resolve(__dirname,'bundle'),
  },
  mode:'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'bundle'),
    compress: true,
    port:3000,
    historyApiFallback: true,
  }
}