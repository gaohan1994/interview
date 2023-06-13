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

  let result = eval('context.fn( ' + args + ' )');
  delete context.fn;

  return result;
};

Function.prototype.apply2 = function (thisArg, params) {
  let context = thisArg;
  context.fn = this;

  let result = eval('context.fn( ' + params + ' )');
  delete context.fn;

  return result;
};

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

  this.sex = 'man';
}

Man.prototype = Object.create(Person.prototype);
Man.prototype.contructor = Man;

function myNew(fn, ...rest) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...rest);

  if (typeof res === 'object' || typeof res === 'function') {
    return res;
  }

  return obj;
}

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

const Vnode = {
  tag: 'DIV',
  attrs: {
    id: 'app',
  },
  children: [
    {
      tag: 'SPAN',
      children: [{ tag: 'A', children: [] }],
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] },
      ],
    },
  ],
};

function render(vnode) {
  if (typeof vnode === 'number') {
    return String(vnode);
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  let node = document.createElement(vnode.tag.toLocaleLowerCase());

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      node.setAttribute(key, value);
    });
  }

  vnode.children.forEach((child) => {
    vnode.appendChild(render(child));
  });

  return node;
}

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

function flattenDfs(array) {
  let data = [];

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      data.push(flattenDfs(array[i]));
    } else {
      data.push(array[i]);
    }
  }

  return data;
}

function match(matchString) {
  if (matchString.length % 2 !== 0) {
    return false;
  }

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

(function () {
  // console.log(match('()'));
  // console.log(match('()[]{}'));
  // console.log(match('(]'));
})();

// ["flower","flow","flight"]
function maxCommonPrefix(strs) {
  let commonPrefix = '';
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

(function () {
  // console.log(maxCommonPrefix(['flower', 'flow', 'flight']));
  // console.log(maxCommonPrefix(['dog', 'racecar', 'car']));
})();

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

(function () {
  // console.log(maxNoRepeatStringLength('abcabcbb'));
  // console.log(maxNoRepeatStringLength('bbbbb'));
  // console.log(maxNoRepeatStringLength('pwwkew'));
  // console.log(maxNoRepeatStringLength(''));
})();

function findMinUnShownNumber(numbers) {
  function quickSort(array) {}
}

/**
 * 手写一个函数
 * 如果api返回正确则返回正确的报文
 * 如果api报错则尝试重新访问，最多count次，如果还是报错则返回错误信息
 */
function request(api, count) {}

/**
 * 柯里化
 * 定长
 *
 * @author Ghan
 * @param {*} func
 * @param {*} length
 */
function curry(func) {
  let len = func.length;
  const presetArgs = [].slice.call(arguments, 1);

  return function () {
    let args = [].slice.call(arguments);
    const allArgs = [...presetArgs, ...args];
    if (allArgs.length >= len) {
      return func.apply(this, allArgs);
    }

    return curry.call(null, func, ...allArgs);
  };
}

function curryLazy(func) {
  const args = [].slice.call(arguments, 1);

  return function () {
    if (arguments.length === 0) {
      return func.call(this, args);
    }
    const selfArgs = [].slice.call(arguments);
    const mergeArgs = [...args, ...selfArgs];
    console.log('mergeArgs', mergeArgs);
    return curryLazy(func, mergeArgs);
  };
}

{
  function addbefore(a, b, c, d) {
    let result = a + b + c + d;
    console.log('result', result);
    return result;
  }

  const add = curry(addbefore);
  // add(1, 2, 3)(0);

  const addLazy = curryLazy(addbefore);
  // addLazy(1, 2, 3)();
}

const getSingle = (function (constructorFunc) {
  let instance = null;

  return function () {
    if (instance) {
      return instance;
    }

    instance = constructorFunc.apply(this, arguments);
    return instance;
  };
})();
