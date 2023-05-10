const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'
    const config = {

        entry: {
          main: './src/index.tsx',
        },
        output: {
          filename: '[name].js',
          path: path.resolve(__dirname, 'build'),
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/, // duyệt các file .ts || .tsx
              exclude: /node_modules/,
              use: ['babel-loader'] // Giúp dịch code TS, React sang JS,
            },
            {
              test: /\.(s[ac]ss|css)$/, // duyệt các file sass || scss || css
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader', // dùng import 'filename.css' trong file tsx, ts
                  options: { sourceMap: !isProduction } // Hiển thị sourcemap ở môi trường dev cho dễ debug
                },
                {
                  loader: 'sass-loader', // biên dịch sass sang css
                  options: { sourceMap: !isProduction }
                }
              ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/, // Dùng để import file ảnh, nếu có video/ảnh định dạng khác thì thêm vào đây
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: isProduction ? 'static/media/[name].[contenthash:6].[ext]' : '[path][name].[ext]'
                  }
                }
              ]
            },
            {
              test: /\.(eot|ttf|woff|woff2)$/, // Dùng để import font
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]'
                  }
                }
              ]
            }
          ]
        },
        plugins: [
          // Tự động bundle khi thay đôỉ endtry point
          new CleanWebpackPlugin,
          new HtmlWebpackPlugin({
              title: 'Open API',
              filename: 'index.html'
          }),
        ],
        devServer: {
          open: true,
          contentBase: './build',
        },
        devtool: 'inline-source-map',
        optimization: {
          splitChunks: {
              chunks: 'all'
          }
        }
      };

    return config
}