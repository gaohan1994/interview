
{
  // 自定义实现 call apply 和 bind
  // 手写 call 和 apply 利用了隐形绑定的原理
 

  Function.prototype.myCall = function (target, ...args) {
    const context = target || window; 

    context.fn = this;

    const result = context.fn(...args);

    delete context.fn;

    return result;
  };

  Function.prototype.myApply = function (target, ...args) {
    const context = target || window;

    context.fn = this;

    const result = context.fn(args);

    delete context.fn;

    return result;
  }

  Function.prototype.myBind = function (target, ...bindArguments) {
    const context = target || window;
    context.fn = this;
    const args = [...bindArguments];

    return function bindExecuter(_, ...executeArguments) {
      const realArguments = args.concat(executeArguments);
      delete context.fn;
      return context.fn(realArguments);
    }
  }

  function test () {
    console.log('this.name', this.name);
  }

  obj = {
    name: "test"
  };

  test.call(obj);
  test.myCall(obj);

  bindTest = test.bind(obj);
  bindTest(1);
}

{
  // 实现一个 myNew

  // 1、创建一个空对象
  // 2、对新创建的对象执行 [[prototype]] 链接
  // 3、执行构造函数
  // 4、如果执行 new 操作的函数有返回则返回结果，没有的话返回这个新创建的对象

  function myNew (contructor, ...args) {
    const target = {};
    target.__proto__ = contructor.prototype;
    const result = contructor.call(target, ...args);
    return result ?? target;
  }
}