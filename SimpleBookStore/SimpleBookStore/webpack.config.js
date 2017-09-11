const path = require("path");

module.exports = {
  entry: [
  './React-app/Scripts/index.jsx'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './', 'Scripts'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: ['node_modules']
  },
  module: {
    loaders: [
    {
      test: /\.(jsx|js)?$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      include: path.join(__dirname, 'React-app'),
      query: {
          presets: ['es2015', 'react']
      }
    },
    {
      test: /\.css$/, use: [
      { loader: "style-loader/url" },
      { loader: "file-loader" }
      ]
    }
    ]
  }
};