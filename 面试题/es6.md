# let const var

- var 存在变量提升及使用 var 定义变量之前调用该变量，值为 undefined
  let 和 const 不存在变量提升，且存在暂时性死区

# 块级作用域

```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

# commonjs 和 es6 module 区别

es6module 是静态分析

- commonjs 模块输出的是值的拷贝 es6module 输出的是值的引用
- commonjs 是运行时加载 es6 是编译时静态加载
- commonjs 是单个值导出 es6 可以导出多个
- commonjs 动态语法可以写在任意位置 es6 只允许在顶层
