//@ts-check

'use strict';

const path = require('path');


/**@type {import('webpack').Configuration}*/
// @ts-ignore
const config = {

  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

  entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js', '.tsx'],
    alias: {
      utils: path.resolve(__dirname, './src/utils.ts'),
      constant: path.resolve(__dirname, './src/constant.ts'),
      providers: path.resolve(__dirname, './src/providers/'),
      components: path.resolve(__dirname, './src/components/'),
    },
  },
  plugins: [
      // @ts-ignore
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader']
      }
    ]
  }
};
module.exports = config;
