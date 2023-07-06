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
