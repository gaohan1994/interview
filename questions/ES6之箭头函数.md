# 你不知道的 javascript 下册

讲讲箭头函数

首先是书写方式不同

```javascript
function handler() {
  // xxx
}

const handler = () => {
  // xxx
};
```

最重要的是 `箭头函数的this绑定规则`
在箭头函数内部，this 的绑定不是动态的，而是词法的

`箭头函数内部没有arguments，arguments继承父层`

`箭头函数无法使用 new 操作符`
