const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry file (main React file)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'], // Transpiles JSX to JS
          },
        },
      },
    ],
  },
  devtool: 'source-map', // This enables the creation of source maps
  resolve: {
    extensions: ['.js', '.jsx'], // Support both JS and JSX files
  },
  mode: 'development', // Set to 'production' for production builds
};