# Object.prototype.toString

优点 准确度较高
缺点 有可能被修改

```javascript
Object.prototype.toString = function () {
  return "Object";
};
```

# instanceOf

不是很准确

```javascript
function myInstanceOf(value, Constructor) {
  let proto = value.__proto__;

  while (proto !== null) {
    if (proto === Constructor.prototype) {
      return true;
    }

    proto = proto.__proto__;
  }

  return false;
}
```

# Array.isArray

准确度最高
不检查值的原型链也不检查构造函数
