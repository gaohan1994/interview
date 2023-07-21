07-04

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22

发出 npm i xx 指令
查询 node_modules 中是否存在 xx 模块

- 如果存在不在安装
- 如果不存在
  - npm 向 registry 查询模块压缩包地址
  - 下载压缩包，存放在根目录下的 .npm 文件夹里
  - 解压压缩包，并存放在 node_modules 目录

# 过程

- 执行 preinstall 钩子函数

- 确定首层依赖模块
  即 dependencies 和 devdependencies 中直接指定的模块

- 获取模块一个递归的过程
  首先确定模块版本，如果指定了版本则使用指定版本，如果没有则从仓库获取，并返回一个 resolved 字段（模块压缩包下载地址）
  获得 resolved 字段后检查本地缓存，缓存中有的话直接用，如果没有则下载
  继续查找该模块的依赖（递归）如果没有则停止

# 扁平化依赖 dedupe

如 A 依赖 lodash B 也依赖 lodash
如果 A 依赖的 lodash 版本和 B 依赖的 lodash 版本有兼容交集，则使用兼容版本，最终：

- A
- B
- lodash

如果没有交集，则后面出现的包保留在依赖树内

- A
- LodashA
- B
  - LodashB

# 安装模块

更新项目的 node_modules 并触发模块生命周期函数 如 preinstall install 等

# 执行工程的生命周期函数

注意区分工程的钩子和模块的钩子
最后生成版本描述文件，npm install 完成
