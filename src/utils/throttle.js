/**
 * 防抖
 * @param {*} executer
 * @param {*} wait
 */
export function throttle(executer, wait = 500) {
  let lastTimestamp = 0;

  return function throttledExecuter(...args) {
    const currentTime = Date.now();

    if (currentTime - lastTimestamp > wait) {
      executer.call(this, ...args);
      lastTimestamp = currentTime;
    }
  };
}
