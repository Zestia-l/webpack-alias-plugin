const path = require('path');
const WebpackAiliasPlugin = require('webpack-alias-plugin');

module.exports = {
  // 入口配置
  entry: './src/index.tsx',

  // 输出配置
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    environment:{
      arrowFunction:true,
    }
  },

  experiments:{
    outputModule:true,
  },
  // 模块处理规则
  module: {
    rules: [
      // Babel 处理 JavaScript
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // CSS 处理
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 图片资源处理
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
      // TypeScript 处理
      ,{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 跳过类型检查加速构建[6](@ref)
              compilerOptions: {
                jsx: 'react' // 强制启用JSX转换[5](@ref)
              }
            }
          }
        ],
      }

    ]
  },

  // 模块解析配置（核心部分）
  resolve: {
    // 路径别名映射
    alias: {
      '@': path.resolve(__dirname, 'src'),       // 映射项目根目录下的 src 文件夹
    },
    // 自动补全文件扩展名
    extensions: ['.js', '.jsx', '.json', '.css','.ts','.tsx']
  },

  // 开发服务器配置（可选）
  devServer: {
    static: './dist',
    hot: true,
    port: 3000
  },

  mode: 'development',
  // 插件配置（可选）
  plugins: [
    new WebpackAiliasPlugin(
      {
        root: path.resolve(__dirname, '../../'), // 指向monorepo根目录
        packages: [
        'packages/*',    // 核心包目录
        'plugins/*'      // 插件目录
      ]
      }
    ),
  ]
};