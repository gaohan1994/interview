{
  /**
  * 把任意一个函数，修饰生成一个带重试功能的新函数。
  * 1、如果执行失败，进行重试；
  * 2、如果执行成功，直接返回结果；
  * 3、如果重试了 n 次依然失败，抛出最后一次的异常。
  * 4、新函数的表现行为要尽可能与原函数保持一致
  *
  * @param {Function} fn
  * @param {number} n 最大重试次数
  * @return {Function} 带有重试功能的新函数
  */
  function useRetryable(fn, retryNumber) {
    return function (...args) {
      try {
        return fn.call(this, args);
      } catch (error) {
        if (retryNumber <= 0)  throw error;
        return useRetryable(fn, retryNumber - 1)();
      }
    }
  }
 

  function useRetryableAsync (fn, retryNumber) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        Promise.resolve(fn(...args))
          .then(resolve)
          .catch((error) => {
            console.log('retryNumber',retryNumber);
            if (retryNumber <= 0) {
              reject(error);
            } else {
              resolve(useRetryableAsync(fn, retryNumber - 1)());
            }
          })
      })
    } 
  }


  const test = () => {
    console.log('run test');
    throw new Error('test error')
  }

  const retryTest = useRetryable(test, 3);

  try {
    // retryTest();  
  } catch (error) {
    console.log('outside error', error);
  }
  
  const testPromise = () => {
    return new Promise((resolve, reject) => {
      reject('error')
    })
  }

  const retryPromise = useRetryableAsync(testPromise, 3);

  retryPromise()
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
}