function promiseAll(promises) {
  const result = new Array(promises.length - 1);

  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      const executer = promises[index];

      Promise.resolve(executer())
        .then(executerResult => {
          result[index] = executerResult;

          if (result.length === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

Promise.prototype.any = function promiseAny(promises) {
  let errors = [];

  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      const promise = promises[index];
      Promise.resolve(promise())
        .then(resolve)
        .catch(error => {
          errors[index] = error;

          if (errors.length === promises.length) {
            reject(errors);
          }
        });
    }
  });
};

{
  // 实现 Promise.finally
  // https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/109

  Promise.prototype.myfinally = function (executer) {
    return this.then(
      result => Promise.resolve(executer()).then(() => value),
      reason =>
        Promise.resolve(executer()).then(() => {
          throw reason;
        })
    );
  };
}

{
  // 介绍下 Promise.all 使用、原理实现及错误处理

  Promise.prototype.myAll = function (promises) {
    let resolvePromisesNumber = 0;
    let result = [];

    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        const promise = promises[index];

        Promise.resolve(promise())
          .then(currentPromiseResult => {
            result[index] = currentPromiseResult;
            resolvePromisesNumber++;

            if (resolvePromisesNumber === promises.length) {
              resolve(result);
            }
          })
          .catch(reject);
      }
    });
  };
}

{
  //. 设计并实现 Promise.race()

  Promise.prototype.myRace = function myRace(promises) {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        const promise = promises[index];
        Promise.resolve(promise()).then(resolve, reject);
      }
    });
  };
}
