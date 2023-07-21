{
  // 比如 sleep(1000) 意味着等待1000毫秒
  // 可从 Promise、Generator、Async/Await 等角度实现

  function sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
