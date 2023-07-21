/**
 * 1、new 操作都做了些什么
 *
 * - new 操作会创建一个空对象
 * - 对空对象执行 prototype 链接
 * - 这个新对象会绑定到函数调用的 this
 * - 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回新创建的对象
 *
 *
 * 2、实现一个 new 操作符
 *
 * function myNew (Constructor, ...rest) {
 *  let obj = {};
 *  obj.__proto__ = Constructor.prototype;
 *  let result = Constructor.call(obj, ...rest);
 *  if (typeof result === 'object' && result !== null) {
 *    return reuslt;
 *  }
 *  return result;
 * }
 *
 * 3、说一下 this 和 原型链 prototype
 *
 * 首先 this 既不指向函数本身，也不指向函数的词法作用域，this指向什么完全取决于函数在哪里被调用
 * 绑定规则
 *
 * - 默认绑定
 * 最常用的绑定，没有其他绑定规则生效时的默认规则
 * 在非严格模式下，指向全局对象，严格模式不允许将全局对象应用到默认绑定，所以指向undefined
 *
 * - 隐式绑定
 * 如果函数被调用时，前面加上了对象的引用，那么隐式绑定会把函数调用中的 this 绑定到这个上下文对象
 * 注意，对象属性引用链只有最后一层在调用位置中起作用
 *
 * - 隐形丢失
 * 在使用函数引用，或者回调函数的时候可能会发生隐形丢失
 *
 * ```javascript
 *
 * function foo () {
 *  console.log(this.a)
 * }
 *
 * const obj = {
 *  a: 2,
 *  foo,
 * };
 *
 * obj.foo(); // 2
 * ```
 *
 * - 显示绑定
 *
 *
 * - new绑定
 */

function myNew(func) {
  let obj = {};

  if (func.prototype !== null) {
    obj.__proto__ = func.prototype;
  }

  const result = func.apply(obj, Array.prototype.slice.call(arguments, 1));

  if ((typeof result === "object" || typeof result === "function") && result !== null) {
    return result;
  }

  return obj;
}

{
  function Test(age) {
    this.name = "Test";
    this.age = age;
  }
  const xiaoMing = new Test(28);
  const xiaoLv = myNew(Test, 20);
}
