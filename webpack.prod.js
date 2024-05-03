const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
});
