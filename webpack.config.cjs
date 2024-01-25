const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const faviconExists = fs.existsSync(path.join(__dirname, './public/favicon.ico'));

module.exports = (env) => {
  const isDevMode = env.mode === 'development' ? true : false;

  return {
    mode: isDevMode ? 'development' : 'production',
    devtool: isDevMode ? 'source-map' : false,
    entry: { main: './src/index.js' },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: './static/js/[name].[contenthash:8].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@src': path.join(__dirname, 'src'),
        '@components': path.join(__dirname, 'src', 'components'),
        '@layouts': path.join(__dirname, 'src', 'layouts'),
        '@styles': path.join(__dirname, 'src', 'styles'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: {
            and: [/node_modules/],
            not: [],
          },
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                /**
                 * @description Babel 설정에 대한 설명
                 * @property {string} targets - 'defaults'. Browserslist의 'defaults' 설정 사용
                 *   - > 0.5%: 전 세계적으로 사용률이 0.5% 이상인 브라우저 버전.
                 *   - last 2 versions: 각 브라우저의 마지막 두 버전.
                 *   - not dead: 최근 24개월 동안 공식 지원이 종료되지 않은 브라우저.
                 * @property {string} useBuiltIns - 'usage'. 필요한 폴리필만 포함.
                 * @property {number} corejs - core-js의 버전을 3으로 설정.
                 */
                ['@babel/preset-env', { targets: 'defaults', useBuiltIns: 'usage', corejs: 3 }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { modules: { auto: /\.module\.(css|scss)$/ } },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 10 * 1024 } }, // 10KB
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
        favicon: faviconExists && './public/favicon.ico',
      }),
      !isDevMode && new CleanWebpackPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'), // default - 빌드 전 정적파일 접근 경로의 기본 경로
      },
      devMiddleware: {
        publicPath: '/', // default - 빌드 결과물 접근 경로의 기본 경로
      },
      historyApiFallback: true,
      liveReload: false, // hot(HMR) 활성화 (hot의 기본값 -> true)
      port: 'auto', // 명시적
    },
  };
};
