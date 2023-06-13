## webpack 工作流程

1、初始化阶段

## webpack 常用的配置项

入口文件 entry
生成文件 output
打包模式 mode
Loader 模块转化器，把命中的文件按照 loader 的规则转化成新内容
Plugins 扩展插件，在 webpack 构建过程中的特定时机注入插件逻辑来改变构建结果
以及拆分器 splitChunks

## Webpack Plugin 和 Loader 的区别

loader 是模块转化器，把命中 loader 范围的文件按照 loader 的规则和 webpack 的 api 加工和转换得到新内容

plugin 是扩展插件在 webpack 构建过程中特定的时机注入插件的逻辑来改变构建结果

loader:

Loader 工作流程:
webpack.config.js 中配置 loader
在 webpack 打包过程中,命中了 loader 的规则,启用该 loader
loader 接受该模块文件内容 source
loader 使用 webpack 提供的 api 对 source 进行转换得到转换后的结果 result
将 result 传递给下一个 loader，直到处理完毕（loader 是按照配置顺序逆序执行）

## 常用 Loader

babel-loader
awesome-typescript-loader

// 注意顺序
style-loader
css-loader
postcss-loader

## 常用 plugins

html-webpack-plugin
非常重要的一个 plugin、根据模板 html 创建打包之后的 html 文件，期间可以把 webpack 生成的 chunk 自动引入到 html 中

mini-css-extra-plugin
webpack 会默认把 css 模块打包到一个文件中，该 plugin 可以把 css 提取成独立文件

definePlugin
定义全局变量

## 怎么优化打包速度

1、webpack-parallel-uglify-plugin
把打包任务分解拆给多个子进程并发执行

2、happyHack
缓存打包

## webpack 怎么优化打包体积

1、按需加载 React.lazy

2、代码分割 splitChunks
提取公共代码

关键字段
chunks: 'all' 'initial' 'async'

maxAsyncRequests: 5 最大异步请求数量
maxInitialRequets: 3 最大初始化请求数

3、开启 mode = production 开启 tree-sharking

## tree-sharking 的原理

消除代码死块
死块一般有 3 个特点
•代码不会被执行，不可到达
•代码执行的结果不会被用到
•代码只会影响死变量（只写不读）

tree-sharking 依赖 es6 模块特性：
es6 模块加载是静态的不可变的

但是也有一点遗憾
对无效的类消除做不到（因为无法确定类文件内是否执行了其他操作）

对函数处理的较好
