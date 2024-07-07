const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const isFaviconExist = fs.existsSync(
  path.join(__dirname, 'public', 'favicon.ico')
);

module.exports = (env) => {
  const isDevMode = env.mode === 'development';

  dotenv.config({ path: './.env' });

  return {
    mode: isDevMode ? 'development' : 'production',
    devtool: isDevMode ? 'inline-source-map' : false,
    entry: { main: './src/index.js' },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: './static/js/[name].[contenthash:8].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@apis': path.join(__dirname, 'src', 'apis'),
        '@assets': path.join(__dirname, 'src', 'assets'),
        '@components': path.join(__dirname, 'src', 'components'),
        '@constants': path.join(__dirname, 'src', 'constants'),
        '@hooks': path.join(__dirname, 'src', 'hooks'),
        '@layouts': path.join(__dirname, 'src', 'layouts'),
        '@pages': path.join(__dirname, 'src', 'pages'),
        '@routes': path.join(__dirname, 'src', 'routes'),
        '@store': path.join(__dirname, 'src', 'store'),
        '@styles': path.join(__dirname, 'src', 'styles'),
        '@utils': path.join(__dirname, 'src', 'utils'),
        '@src': path.join(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: 'defaults', useBuiltIns: 'usage', corejs: 3 },
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
          exclude: {
            and: [/node_modules/],
            not: [],
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /\.module\.(css|scss)$/,
                  localIdentName: isDevMode
                    ? '[local]--[hash:base64:5]'
                    : '[hash:base64]',
                },
              },
            },
            'sass-loaders',
          ],
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
          generator: {
            filename: './static/assets/images/[name].[contenthash:8].[ext]',
          },
        },
        {
          test: /\.(mp4|webm)$/,
          type: 'asset/resource',
          generator: {
            filename: './static/assets/videos/[name].[contenthash:8].[ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: isFaviconExist && './public/favicon.ico',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      !isDevMode && new CleanWebpackPlugin(),
    ],
    devServer: {
      historyApiFallback: true,
      liveReload: false,
      proxy: [],
    },
  };
};
