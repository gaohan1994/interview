async function updateStatus(userId) {
  // const profile = await fetchProfile(userId);
  // const permission = await fetchPermission(userId);

  const [profile, permission] = await Promise.all([
    fetchProfile,
    fetchPermission,
  ]);

  await saveToDB(DB_STATUS, { profile, permission });
}

Promise.prototype.all2 = function (promises) {
  // 存放promise结果
  let result = [];

  // promise执行完成数量，如果与promises.length相等则应该返回result
  let count = 0;

  return new Promise((resolveAll) => {
    for (let i = 0; i < promises.length; i++) {
      const currentPromsie = promises[i];
      Promise.resolve(currentPromsie)
        .then((currentResult) => {
          result[i] = currentResult;
          count++;
        })
        .catch((error) => {
          result[i] = error;
          count++;
        })
        .finally(() => {
          if (count === promises.length) {
            resolveAll(result);
          }
        });
    }
  });
};

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
      this.map.set(eventName, prevEventCallbacks);
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

async function hello() {
  throw new Error('hello error');
}

hello();
console.log(1);
// try {
// } catch (error) {
//   console.log(2, error);
// }

setTimeout(() => {
  console.log('hello');
}, 0);
console.log(3);

// -----

console.log('script start');

async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();

setTimeout(function () {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');

// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// settimeout

console.log('start');
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(function () {
    console.log('promise1');
  });
}, 0);
setTimeout(() => {
  console.log('timer2');
  Promise.resolve().then(function () {
    console.log('promise2');
  });
}, 0);
Promise.resolve().then(function () {
  console.log('promise3');
});
console.log('end');

// start;
// end;
// promise3;
// timer1;
// promise1;
// timer2;
// promise2;

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');

// script start
// script end
// promise1
// promise2
// settimeout

setTimeout(() => {
  console.log('setTimeout1');
}, 0);
let p = new Promise((resolve, reject) => {
  console.log('Promise1');
  resolve();
});
p.then(() => {
  console.log('Promise2');
});

/**
 * promise1
 * promise2
 * settimeout1
 */

Promise.resolve().then(() => {
  console.log('Promise1');
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);
});

setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => {
    console.log('Promise2');
  });
}, 0);

/**
 * promise1
 * settimeout1
 * promise2
 * settimeout2
 */

console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  });
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  });
});
process.nextTick(function () {
  console.log('6');
});
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8');
});

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  });
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12');
  });
});

/**
 * 1
 * 7
 * 6
 * 8
 * 2 4 3 5
 * 9 11 10 12
 */

setTimeout((_) => console.log(4));

new Promise((resolve) => {
  console.log('hello');
  resolve();
  console.log('promise end');
}).then((_) => {
  console.log(3);
  Promise.resolve()
    .then((_) => {
      console.log('before timeout');
    })
    .then((_) => {
      Promise.resolve().then((_) => {
        console.log('also before timeout');
      });
    });
});

console.log(2);

/**
 *
 */

async function hello() {
  console.log('hello start');
  await 1;
  console.log('hello end');
}

await hello();
console.log('1');

setTimeout((_) => console.log(4));

async function main() {
  console.log(1);
  await Promise.resolve();
  console.log(3);
}

main();

/**
 * 1
 * 3
 * 4
 */

console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  });
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  });
});
process.nextTick(function () {
  console.log('6');
});
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8');
});

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  });
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12');
  });
});

/**
 * 1，7，6，8，2，4，3，5，9，11，10，12
 * 1 7  6 8
 * 2 4  3 5
 * 9 11 10 12
 */

console.log('script start');

setTimeout(() => {
  console.log('北歌');
}, 1 * 2000);

Promise.resolve()
  .then(function () {
    console.log('promise1');
    setTimeout(() => {
      console.log('hello');
    }, 0);
  })
  .then(function () {
    console.log('promise2');
  })
  .then(() => {
    console.log('5');
  });

Promise.resolve()
  .then(function () {
    console.log('promise3');
  })
  .then(function () {
    console.log('promise4');
  });

console.log('script end');

/**
 * 
 * script start
  VM67:34 async2 end
  VM67:37 script end

  VM67:10 promise1
  VM67:18 async1 end
  VM67:26 error!!!
  VM67:28 async1
  VM67:13 promise2
  VM67:31 async1 success

 * error!!!
 * async1
 * script end
 * promise1
 * promise2
 * async1 end
 * async1 success
 */

console.log('script start');

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

async function foo() {
  await bar();
  console.log('async1 end');
}
foo();

async function errorFunc() {
  try {
    await Promise.reject('error!!!');
  } catch (e) {
    console.log(e);
  }
  console.log('async1');
  return Promise.resolve('async1 success');
}
errorFunc().then((res) => console.log(res));

function bar() {
  console.log('async2 end');
}

console.log('script end');

/**
 * script start
 * async2 end
 * script end
 * promise1
 * async1 end
 * error!!!
 * async1
 * promise2
 * async1 success
 */

console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
  new Promise((resolve) => {
    console.log('4');
    resolve();
  }).then(() => {
    console.log('5');
  });
});

Promise.reject().then(
  () => {
    console.log('13');
  },
  () => {
    console.log('12');
  }
);

new Promise((resolve) => {
  console.log('7');
  resolve();
}).then(() => {
  console.log('8');
});

setTimeout(() => {
  console.log('9');
  Promise.resolve().then(() => {
    console.log('10');
  });
  new Promise((resolve) => {
    console.log('11');
    resolve();
  }).then(() => {
    console.log('12');
  });
});

/**
 * 1 7 12 8
 * 2 4 3 5
 * 9 11 10 12
 */

new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then(() => {
    // 微1-1
    console.log(2);
    new Promise((resolve, reject) => {
      console.log(3);
      setTimeout(() => {
        // 宏2
        reject();
      }, 3 * 1000);
      resolve(); // TODO 注1
    })
      .then(() => {
        // 微1-2  TODO 注2
        console.log(4);
        new Promise((resolve, reject) => {
          console.log(5);
          resolve();
        })
          .then(() => {
            // 微1-4
            console.log(7);
          })
          .then(() => {
            // 微1-6
            console.log(9);
          });
      })
      .then(() => {
        // 微1-5 TODO 注3
        console.log(8);
      });
  })
  .then(() => {
    // 微1-3
    console.log(6);
  });

/**
 * 1 2 3 6
 *
 */

/**
 * start
 * promise1
 * timer1
 * promise3
 * timer2
 *
 * undefined error2 promise2
 * async1
 *
 * error1 then: error!!!
 */

Promise.resolve()
  .then(() => {
    console.log('promise1');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('timer2');
        resolve();
      }, 0);
    })
      .then(async () => {
        await foo();
        return new Error('error1');

        Promise.resolve(foo()).then(() => {
          return new Error('error1');
        });
      })
      .then(
        (ret) => {
          setTimeout(() => {
            console.log(ret);
            Promise.resolve()
              .then(() => {
                return new Error('error!!!');
              })
              .then((res) => {
                console.log('then: ', res);
              })
              .catch((err) => {
                console.log('catch: ', err);
              });
          }, 1 * 3000);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally((res) => {
        console.log(res);
        throw new Error('error2');
      })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  })
  .then(() => {
    console.log('promise2');
  });

function foo() {
  setTimeout(() => {
    console.log('async1');
  }, 2 * 1000);
}

setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise3');
  });
}, 0);

// start

/**
 * script start
 * async1 start
 * error1
 * async2
 * promise1
 * script end
 *
 * promise2 then1-1 promise3
 *
 * promise4 undefined
 * 2 async1 end
 */

async function async1() {
  console.log('async1 start');
  new Promise((resolve, reject) => {
    try {
      throw new Error('error1');
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      // 宏3
      resolve('promise4');
    }, 3 * 1000);
  })
    .then(
      (res) => {
        // 微3-1
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
    .finally((res) => {
      // 微3-2 // TODO注3
      console.log(res);
    });
  console.log(await async2()); // 微4-1  TODO-注1

  Promise.resolve(async2()).then((res) => {
    console.log(res);
  });

  console.log('async1 end'); // 微4-2 // TODO-注2
}

function async2() {
  console.log('async2');
  return new Promise((resolve) => {
    setTimeout(() => {
      // 宏4
      resolve(2);
    }, 1 * 3000);
  });
}

console.log('script start');

setTimeout(() => {
  // 宏2
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
})
  .then(() => {
    // 微1-2
    console.log('promise2');
    return new Promise((resolve) => {
      resolve();
    }).then(() => {
      // 微1-3
      console.log('then 1-1');
    });
  })
  .then(() => {
    // 微1-4
    console.log('promise3');
  });

console.log('script end');
