// 手写一个 event emmiter
class EventEmiter {
  constructor() {
    // 事件集合
    // { key: Array<T> }
    this.map = new Map();
  }
  /**
   * 注册事件
   * 可能有多个注册函数
   */
  on(eventName, func) {
    if (this.map.has(eventName)) {
      // 如果已经有该事件，则继续向该事件添加函数
      const prevEventCallbacks = this.map.get(eventName);
      prevEventCallbacks.push(func);
      this.map.set(prevEventCallbacks);
    } else {
      // 没有该事件
      this.map.set(eventName, [func]);
    }
  }

  /**
   * 触发
   */
  emit(eventName) {
    if (!this.map.has(eventName)) {
      return;
    }
    // 执行参数
    const args = Array.prototype.slice.call(arguments, 1);

    const currentCallbacks = this.map.get(eventName);
    for (let i = 0; i < currentCallbacks.length; i++) {
      const currentCallback = currentCallbacks[i];
      currentCallback.call(this, args);
    }
  }
}

export function createPromiseList(promises) {
  return promises.reduce((accPromise, currentPromise) => {
    return Promise.resolve(currentPromise).then(accPromise);
  }, Promise.resolve());
}

export function pipe(functions) {
  if (functions.length === 0) {
    return () => {};
  }
  if (functions.length === 1) {
    return functions[0];
  }
  return function (...rest) {
    return functions.reduce((a, b) => {
      b(a(...rest));
    });
  };
}

export function createComposePromise(promises) {
  return function (params, next) {
    let index = -1;
    function dispatch(currentIndex) {
      if (index > currentIndex) {
        return;
      }
      index = currentIndex;

      const currentPromise = promises[currentIndex];
      if (!currentPromise) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(
          currentPromise(params, () => dispatch(currentIndex + 1))
        );
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return dispatch(0);
  };
}

export default EventEmiter;

/**
 * promise 队列 执行完当前 promise再执行下一个
 *
 * @author Ghan
 * @class PromiseLiner
 */
export class PromiseLiner {
  constructor() {
    this.promise = Promise.resolve();
  }

  add(func) {
    this.promise = this.promise.then(func);
    return this;
  }

  run() {
    return Promise.resolve(this.promise);
  }
}
