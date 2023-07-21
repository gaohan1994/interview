# 你不知道的 javascript 下册

# Sybmol

在 es6 中新增
没有字面量形式，也不允许使用 new 创建，symbol 不是一个构造函数

```javascript
const sym = Symbol("this symbol description");

`用途`;

const EVENT_LOGIN = Sybmol("event.login");

eventBus.listen(EVENT_LOGIN, function () {});
```

全局符号注册 `Sybmol.for(name)`
全局查找符号 name 如果存在则返回，如果不存在则创建
