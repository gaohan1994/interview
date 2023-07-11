/**
 * 目的：
 * ES6之前的代码可以使用 generator 或者 iterator 么？
 *
 * function* foo() {
 *   var x = yield 42;
 *   console.log("x", x);
 * }
 */

/**
 *
 *
 * 需要内部变量来记住当前生成器运行的状态
 * state
 *
 * 0 初始状态
 * 1 等待 yield 表达式
 * 2 生成器完毕
 *
 * @returns
 */
function foo() {
  function nextState(value) {
    switch (state) {
      case 0:
        state++;

        // yield 表达式
        return 42;

      case 1:
        state++;

        // yield 表达式完成
        x = value;
        return undefined;
    }
  }

  var state = 0,
    x;

  return {
    next: function (value) {
      var result = nextState(value);
      return { value: result, done: state === 2 };
    },
  };
}
