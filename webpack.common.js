const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/scripts/index.js'),
        styles: ['./src/styles/style.css', './src/styles/responsive.css'],
    },
    output: {
        filename: 'main~[name].bundle.js',
        path: path.resolve(__dirname, 'build/'),
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  {
                      loader: 'style-loader',
                  },
                  {
                      loader: 'css-loader',
                  },
                ],
            },
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                          presets: [
                              '@babel/preset-env',
                              '@babel/preset-react',
                          ],
                      },
                  },
              ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/templates/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/public/'),
                    to: path.resolve(__dirname, 'build/'),
                    // globOptions: {
                    //     ignore: ['**/heros/**'],
                    // },
                },
            ],
        }),
        new MiniCssExtractPlugin({ filename: '[name].[chunkhash:8].css' }),
        // new OptimizeCssAssetsPlugin({
        //   assetNameRegExp: /\.optimize\.css$/g,
        //   cssProcessor: require('cssnano'),
        //   cssProcessorPluginOptions: {
        //     preset: ['default', { discardComments: { removeAll: true } }],
        //   },
        //   canPrint: true
        // }),
        new WebpackPwaManifest({
          name: 'HeyCa Special 17th',
          short_name: 'HeyCa!!',
          start_url: '.',
          description: 'HeyCa!! - Special 17th Birthday Gift',
          background_color: '#ffffff',
          theme_color: '#faf5ff',
          crossorigin: 'use-credentials',
          orientation: 'portrait',
          // display_override : ['fullscreen', 'minimal-ui'],
          display: 'standalone',
          prefer_related_applications: false,
          description: 'HeyCa Special 17th Birthday Gift',
          screenshots: [
            {
              src: path.resolve('/images/screenshots/screenshots-1.png'),
              sizes: '586x1041',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Heyca Wonder Widgets',
            },
            {
              src: path.resolve('/images/screenshots/screenshots-2.png'),
              sizes: '586x1041',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Heyca Wonder Widgets',
            },
            {
              src: path.resolve('/images/screenshots/screenshots-3.png'),
              sizes: '586x1041',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Heyca Wonder Widgets',
            },
            {
              src: path.resolve('/images/screenshots/screenshots-4.png'),
              sizes: '586x1041',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Heyca Wonder Widgets',
            },
          ],
          icons: [
            {
              src: path.resolve('./src/public/images/favicon/icon.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('/images/favicon/icons', 'ios'),
              ios: true,
            },
            {
              src: path.resolve('./src/public/images/favicon/icon.png'),
              sizes: [16, 24, 32, 64],
              destination: path.join('/images/favicon/icons', 'x-icon'),
              type: 'image/x-icon',
            },
            {
              src: path.resolve('./src/public/images/favicon/icon.png'),
              sizes: '1024x1024',
              destination: path.join('/images/favicon/icons', 'maskable'),
              purpose: 'maskable',
            },
          ],
        }),        
        new InjectManifest({
          swSrc: './src/scripts/sw.js',
          swDest: 'sw.js',
          exclude: [
            /\.png$/,
            /\.webp$/,
            /\.jpg$/,
            /\.mp3$/,
            /_redirects/,
          ],
          maximumFileSizeToCacheInBytes: 5000000,
        }),
    ],
};
