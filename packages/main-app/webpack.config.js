const path = require('path');

module.exports = {
  // 入口配置
  entry: './src/index.js',

  // 输出配置
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
    ]
  },

  // 模块解析配置（核心部分）
  resolve: {
    // 路径别名映射
    alias: {
      '@': path.resolve(__dirname, 'src'),       // 映射项目根目录下的 src 文件夹
      components: path.resolve(__dirname, 'src/components'), // 组件目录
      utils: path.resolve(__dirname, 'src/utils'),           // 工具函数目录
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

  // 插件配置（可选）
  plugins: [
  ]
};