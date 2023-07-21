
{
  /**
   * 你尽管触发事件
   * 但是我一定在事件触发 n 秒后才执行
   * 如果你在一个事件触发的 n 秒内又触发了这个事件
   * 那我就以新的事件的时间为准，n 秒后才执行
   * 总之，就是要等你触发完事件 n 秒内不再触发事件
   * 
   * @param {*} executer 要执行的函数
   * @param {*} wait 节流的时间
   * @param {boolean} immediate 是否立即执行一次
   */
  function debounce (executer, wait, immediate = false) {
    let timer = undefined, result = undefined;

    function debouncedExecuter (...args) {
      args = Array.prototype.slice.call(args, 1);
      
      if (timer) {
        clearTimeout(timer);
      }

      if (immediate) {

        /**
         * 因为 clearTimeout 不会将 timer 重置为 undefined
         * 所以只有执行了 setTimeout 中的 timer = undefined 后
         * 才可以继续命中 immediate 中的 shouldExecute条件
         */
        const shouldExecute = !timer;

        setTimeout(() => {
          timer = undefined;
        }, wait);

        if (shouldExecute) {
          result = executer.call(this, args);
        }
      } else {
        timer = setTimeout(() => {
          executer.call(this, args);
          clearTimeout(timer);
        }, wait);
      }

      return result;
    }

    /**
     * 取消防抖只有在 immediate 模式下可用
     * 取消防抖功能
     * 取消之后可以立即执行
     */
    function cancelDebounce () {
      if (immediate === false) {
        return console.error(`Only can cancel debounce in immediate debounce mode`)
      }

      clearTimeout(timer);
      timer = undefined;
    }

    return [debouncedExecuter, cancelDebounce]
  }
}


{
  /**
   * 如果你持续触发事件，每隔一段时间，只执行一次事件。
   * 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
   * 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
   * 
   * @param {*} executer 要节流的函数
   * @param {*} wait 节流时间
   */
  function throttle (executer, wait) {
    /**
     * 让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，
     * 然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，
     * 就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。 
     * */ 

    let timer = undefined, lastTimestamp = 0, context, args;

    const later = function () {
      lastTimestamp = Date.now();
      timer = undefined;
      executer.call(context, ...args);
    }

    return function throttleExecuter (...rest) {
      context = this;
      args = rest;

      const now = Date.now();
      const remaining = wait - (now - lastTimestamp);

      if (remaining < 0 || remaining > wait) {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }

        lastTimestamp = now;
        executer.call(context, ...args);
      } else if (!timer) {
        timer = setTimeout(later, remaining);
      }
    }
  }

  function test () {
    console.log('hello test throttle');
  }

  function runThrottle () {
    const throttleTest = throttle(test, 500);

    throttleTest();

    setTimeout(() => {
      throttleTest();
    }, 100);

    setTimeout(() => {
      throttleTest();
    }, 300);

    setTimeout(() => {
      throttleTest();
    }, 600);


    setTimeout(() => {
      throttleTest();
    }, 800);
  }
 
}

{
  /**
   * 如果你持续触发事件，每隔一段时间，只执行一次事件。
   * 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
   * 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
   * 
   * @param {*} executer 要节流的函数
   * @param {*} wait 节流时间
   */
  function throttle (executer, wait) {
    /**
     * 让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，
     * 然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，
     * 就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。 
     * */ 

    let lastTimestamp = 0;

    return function throttleExecuter (...args) {
      const executerThis = this;

      const now = Date.now();

      if (now - lastTimestamp > wait) {
        executer.call(executerThis, ...args);
        lastTimestamp = now;
      }
    }
  }

  function test () {
    console.log('hello test throttle');
  }

  function runThrottle () {
    const throttleTest = throttle(test, 500);

    throttleTest();

    setTimeout(() => {
      throttleTest();
    }, 100);

    setTimeout(() => {
      throttleTest();
    }, 300);

    setTimeout(() => {
      throttleTest();
    }, 600);


    setTimeout(() => {
      throttleTest();
    }, 800);
  }

  // runThrottle();
}


{
  /**
   * 接下来，我们讲讲第二种实现方式，使用定时器。
   * 当触发事件的时候，我们设置一个定时器，再触发事件的时候，
   * 如果定时器存在，就不执行，直到定时器执行，
   * 然后执行函数，清空定时器，这样就可以设置下个定时器。
   * 
   * @param {*} executer 
   * @param {*} wait 
   * @returns 
   */
  function throttle (executer, wait) {
    let timer = undefined;

    return function throttleExecuter (...args) {
      const executerThis = this;

      if (timer === undefined) {
        executer.call(executerThis, ...args);
        
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = undefined;
        }, wait);
      }
    }
  }



  function test () {
    console.log('hello test throttle');
  }

  function runThrottle () {
    const throttleTest = throttle(test, 500);

    throttleTest();

    setTimeout(() => {
      throttleTest();
    }, 100);

    setTimeout(() => {
      throttleTest();
    }, 300);

    setTimeout(() => {
      throttleTest();
    }, 600);


    setTimeout(() => {
      throttleTest();
    }, 800);
  }

  // runThrottle();
}