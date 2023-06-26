const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssPlugin = require("postcss-preset-env");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const entry = path.resolve(__dirname, "../src/index.js");
const publicPath = path.resolve(__dirname, "../public/index.html");

const postcssPxToViewport = require("postcss-px-to-viewport");
const postcssViewportUnits = require("postcss-viewport-units");

module.exports = {
  mode: "none",
  // 起点
  entry: entry,
  // 输出位置
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash8].chunk.js",
  },
  module: {
    rules: [
      {
        // 如果想要 import 图片 需要引入 url-loader
        test: /\.(png|jpg|gif)$/i,
        use: [{ loader: "url-loader" }],
      },
      {
        // 配置 babel-loader 转化es6 js 文件至 es5
        // 如果想运行 react 代码，还需要配置 @babel/preset-react 让webpack知道jsx语法
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              // postcssOptions: {
              //   plugins: [['autoprefixer']],
              // },
              plugins: [
                ["postcss-preset-env"],
                [
                  "postcss-px-to-viewport",
                  {
                    viewportWidth: 750, // (Number) The width of the viewport.
                    viewportHeight: 1334, // (Number) The height of the viewport.
                    unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                    viewportUnit: "vw", // (String) Expected units.
                    selectorBlackList: [".ignore", ".hairlines"], // (Array) The selectors to ignore and leave as px.
                    minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                    mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
                  },
                ],
                ["postcss-viewport-units"],
              ],
            },
          },
        ],
      },
      {
        // 如果要使用 less 则需要配置 less-loader 注意顺序
        // 这个时候 less 会生成在js里 需要引入 mini-css-extract-plugin 生成单独的 css 文件
        test: /\.less$/,
        use: [
          // { loader: 'style-loader' },
          // 注意 MiniCssExtractPlugin 应该使用在 production
          // style-loader 在 development
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },

          {
            loader: require.resolve("postcss-loader"),
            // options: {
            //   plugins: [],
            // },
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                  // [
                  //   'postcss-px-to-viewport',
                  //   {
                  //     viewportWidth: 750, // (Number) The width of the viewport.
                  //     viewportHeight: 1334, // (Number) The height of the viewport.
                  //     unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                  //     viewportUnit: 'vw', // (String) Expected units.
                  //     selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                  //     minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                  //     mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
                  //   },
                  // ],
                  // ['postcss-viewport-units'],
                ],
              },
            },
          },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 2,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          filename: "[name].vendor.js",
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react-lib",
          chunks: "all",
          reuseExistingChunk: true,
        },
        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        //   reuseExistingChunk: true,
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
      },
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),

    // 生成一个html文件其中用script引入名为 output name 的js文件
    new HtmlWebpackPlugin({ template: publicPath }),

    // 每次打包清空 dist 目录
    new CleanWebpackPlugin(),

    // 生成单独css的插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    // 忽略 moment 国际化文件等等
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      },
      AppConfig: JSON.stringify({
        AppName: "Interview",
      }),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "../public"),
    },
    compress: true,
    port: 3003,
  },
};
