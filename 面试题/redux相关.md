# 说下 redux

redux 的目的是创建和维护一块数据

只能通过 redux 暴露出来的 dispatch 改变 state
使用了观察者模式，每次触发 dispatch 改变状态之后会遍历所有的 linster 函数通知数据改变

# 说下 redux 的中间件

```javascript
// compose;

function compose(...middlewares) {
  if (middlewares.length === 0) {
    return (...args) => args;
  }
  if (middlewares.length === 1) {
    return middlewares[0];
  }

  return middlewares.reduce((prevMiddleware, currentMiddleware) => {
    return function (...args) {
      return prevMiddleware(currentMiddleware(...args));
    };
  });
}

// 手写一个 logger

function createLogger() {
  return function ({ dispatch, getState }) {
    return function (next) {
      return function (action) {
        console.log('prevState', getState());
        const result = next(action);
        console.log('currnetState', getState());
        return result;
      };
    };
  };
}

const logger = createLogger();
```
