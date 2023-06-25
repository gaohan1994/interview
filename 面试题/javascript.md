## this

```javascript
var number = 5;
var obj = {
  number: 3,
  fn1: (function () {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    };
  })(),
};
var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();
console.log(window.number);
```

## bind apply call 区别

三个都是都可以改变函数的执行时的 this 指向
三者第一个参数都是要修改的 this 指向

bind 返回绑定新的 this 指向的函数
apply 和 call 则返回绑定新的 this 指向执行之后的函数结果
apply 第二个参数是数组或者类数组类型，call 是参数列表

手写

```javascript
Function.prototype.bind2 = function (thisArg) {
  const args = Array.prototype.slice.call(arguments, 1);
  const context = this;

  let bindFunction = function () {
    const selfArgs = Array.prototype.slice.call(arguments, 1);
    const mergeArgs = args.concat(selfArgs);

    context.apply(thisArg, mergeArgs);
  };

  bindFunction.prototype = Object.create(this.prototype);

  return bindFunction;
};
Function.prototype.call2 = function (thisArg) {
  const args = Array.prototype.slice.call(arguments, 1);

  let context = thisArg;
  context.fn = this;

  let result = eval("context.fn( " + args + " )");
  delete context.fn;

  return result;
};
Function.prototype.apply2 = function (thisArg, params) {
  let context = thisArg;
  context.fn = this;

  let result = eval("context.fn( " + params + " )");
  delete context.fn;

  return result;
};

Function.prototype.call2 = function (context, ...rest) {
  const executer = this;
  const key = Symbol();

  context = {
    ...context,
    key: executer,
  };

  const result = context.key(...rest);
  delete context.key();

  return result;
};

Function.prototype.apply2 = function (context, args) {
  const executer = this;
  const key = Symbol();

  context = {
    ...context,
    key: executer,
  };

  const result = context.key(args);
  delete context.key();

  return result;
};
Function.prototype.bind2 = function (thisArg, ...rest) {
  let args = [].concat(rest);
  let executer = this;

  return function bindedFunction(...runExecuterArgs) {
    return executer.apply(thisArg, args.concat(runExecuterArgs));
  };
};
```

## 闭包的应用场景

模拟块级作用域
节流和防抖
创建私有变量

## 节流 和 防抖

运用了闭包

节流

```javascript
function debounce(callback, delay, immidiate = true) {
  let timer;

  return function () {
    const context = this;
    const args = Array.prototype.slice.call(arguments);

    if (timer) {
      clearTimeout(timer);
    }

    if (immidiate) {
      const canNowToken = !timer;

      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (canNowToken) {
        callback.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    }
  };
}

function throttle(callback, delay) {}
```

# 手写寄生组合继承以及其好处

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.hello = function () {
  console.log(`${this.name}: hello`);
};

function Man(name, age) {
  Person.call(this);
  this.name = name;
  this.age = age;

  this.sex = "man";
}

Man.prototype = Object.create(Person.prototype);
Man.prototype.contructor = Man;
```

# 手写 new

```javascript
function myNew() {
  let target = {};
  let [constructor, ...args] = [...arguments];

  target.__proto__ = constructor.prototype;
  let result = constructor.call(target, args);

  if (typeof result === "object" || typeof result === "function") {
    return result;
  }

  return target;
}
```

# 手写 settimeout 模拟 setinterival

```javascript
function mySetInterval(func, timeout) {
  let timer;
  let clearToken = false;

  function cancel() {
    if (timer) {
      clearTimeout(timer);
      clearToken = true;
    }
  }

  function myInterval() {
    if (clearToken) {
      clearTimeout(timer);
      return;
    }

    func();
    timer = setTimeout(myInterval, timeout);
  }

  timer = setTimeout(myInterval, timeout);

  return { cancel };
}
```

# 虚拟 dom 转真实 dom

```javascript
function render(vnode) {
  if (typeof vnode === "number") {
    return String(vnode);
  }
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  let node = document.createElement(vnode.tag.toLocaleLowerCase());

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      node.setAttribute(key, value);
    });
  }

  vnode.children.forEach(child => {
    vnode.appendChild(render(child));
  });

  return node;
}
```

# 手写一个扁平化函数 flatten

```javascript
function flatten(array) {
  let data = [];
  let quene = [...array];

  while (quene.length > 0) {
    const node = quene.pop();

    if (Array.isArray(node)) {
      quene.push(node);
      continue;
    }

    data.push(node);
  }

  return data.reverse();
}
```

# 手写判断括号字符串是否有效

利用栈

```code
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
```

```javascript

  function matched(start, end) {
    if (start === '(') {
      return end === ')';
    }

    if (start === '{') {
      return end === '}';
    }

    if (start === '[') {
      return end === ']';
    }

    return false;
  }

  let queneStart = [];
  let queneEnd = [];

  function position(code) {
    if (code === '{' || code === '[' || code === '(') {
      queneStart.push(code);
    } else {
      queneEnd.push(code);
    }
  }

  for (let i = 0; i < matchString.length; i++) {
    const code = matchString.charAt(i);
    position(code);
  }

  if (queneStart.length !== queneEnd.length) {
    return false;
  }

  while (queneStart.length > 0 && queneEnd.length > 0) {
    const start = queneStart.shift();
    const end = queneEnd.shift();

    if (matched(start, end) === false) {
      return false;
    }
  }

  return true;
}
```

# 手写-查找数组公共前缀（美团）

```code
编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
```

```javascript
function maxCommonPrefix(strs) {
  let commonPrefix = "";
  let index = 0;
  const firstStr = strs[0];

  while (index < firstStr.length) {
    const currentCode = firstStr.charAt(index);

    for (let i = 0; i < strs.length; i++) {
      if (strs[i].charAt(index) !== currentCode) {
        return commonPrefix;
      }
    }

    commonPrefix += currentCode;
    index++;
  }

  return commonPrefix;
}
```

# 手写-字符串最长的不重复子串

```javascript
function maxNoRepeatStringLength(str) {
  let startIndex = 0;
  let maxLength = 0;

  while (startIndex < str.length) {
    let currentString = str.charAt(startIndex);

    for (let i = startIndex + 1; i < str.length; i++) {
      const currentCode = str.charAt(i);
      if (currentString.includes(currentCode)) {
        break;
      }

      currentString += currentCode;
    }

    maxLength = Math.max(currentString.length, maxLength);

    if (maxLength > str.length - startIndex) {
      return maxLength;
    }

    startIndex++;
  }
  return maxLength;
}
```

# 手写-如何找到数组中第一个没出现的最小正整数 怎么优化（字节）

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

# babel 是什么

babel 是一个可以把高版本的 javscript 转化成低版本 javascript 的编译器

- 解析
- 转换
- 生成

# 原型链判断

写出答案

```javascript
// null
Object.prototype.__proto__;

// Object.prototype
Function.prototype.__proto__;

//
Object.__proto__;

// true
Object instanceof Function;

// true
Function instanceof Object;

// true
Function.prototype === Function.__proto__;
```

# this

```javascript
var num = 10; // 60
const obj = { num: 20 };
obj.fn = (function (num) {
  this.num = num * 3;
  num++;
  return function (n) {
    this.num += n;
    num++;
    console.log(num);
  };
})(obj.num);
// 初始化指向 window

var fn = obj.fn;
fn(5);
// this 指向 window
// window.num = 60 + 5 = 65
// 闭包 num = 21 + 1 = 22 ouput num => 22
obj.fn(10);
// this 指向 obj
// obj.num = 20 + 10 = 30
// 闭包 num = 22 + 1 = 23 output num => 23
console.log(num, obj.num);
// window num => 65 obj num => 30

var a = {
  name: "zhang",
  sayName: function () {
    console.log("this.name=" + this.name);
  },
};
var name = "ling";
function sayName() {
  var sss = a.sayName;
  sss(); //this.name = ?
  a.sayName(); //this.name = ?
  a.sayName(); //this.name = ?
  (b = a.sayName)(); //this.name = ?
}
sayName();

// ling
// zhang
// zhang
// ling

var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a;
    return function (c) {
      console.log("this", this);
      console.log(this.a + b + c);
    };
  },
};
var a = 2;
var obj2 = { a: 3 };

obj.foo(a).call(obj2, 1);
// 6
obj.foo.call(obj2)(1);

var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()(); // window
person1.obj.foo1.call(person2)(); // window
person1.obj.foo1().call(person2); // person2

person1.obj.foo2()(); // obj
person1.obj.foo2.call(person2)(); // window
person1.obj.foo2().call(person2); // person2
```
