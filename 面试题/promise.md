# 手写 promise all 和 promise race

```javascript
Promise.all2 = function (promises) {
  let count = 0;
  let result = [];

  return new Promise((resolveAll, rejectAll) => {
    promises.forEach((currentPromise, index) => {
      Promise.resolve(currentPromise)
        .then((currentResult) => {
          result[index] = currentResult;

          if (count === promises.length) {
            resolveAll(result);
          }
        })
        .catch((currentError) => {
          rejectAll(currentError);
        });
    });
  });
};

Promise.race2 = function (promises) {
  return new Promise((resoveRace, rejectRace) => {
    for (let i = 0; i < promises.length; i++) {
      const currentPromise = promises[i];

      Promise.resolve(currentPromise)
        .then((currentResult) => {
          resoveRace(currentResult);
        })
        .catch((currentError) => {
          rejectRace(currentError);
        });
    }
  });
};
```
