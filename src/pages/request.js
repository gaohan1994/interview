/**
 * 实现一个函数，请求接口，这个接口可能在10秒内报错，如果接口报错的话重新请求接口，最多重新请求3次
 *
 *
 * @export
 * @param {number} [repeatTimes=3] 超时次数
 * @param {number} [delay=1000] 延时执行时间
 * @return {*}
 */
export default function repeat(repeatTimes = 3, delay = 1000) {
  /**
   * 当前执行次数
   */
  let time = 0;

  /**
   * 最后一次请求结果
   */
  let lastResponse;

  /**
   * 请求在10秒内抛出错误
   *
   * @param {*} url
   */
  function fetchMock(params) {
    console.log(`第${time}次请求`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let token = Math.random() * 10 > 5;
        if (token) {
          resolve({ code: 'success' });
        } else {
          const responseReject = { code: 'reject' };
          lastResponse = responseReject;
          reject(responseReject);
        }
      }, delay);
    });
  }

  /**
   * 请求函数
   *
   * 返回一个promise
   *
   * @param {*} url
   * @param {*} options
   * @param {*} params
   */
  function repeatRequest() {
    const params = Array.prototype.slice.call(arguments);

    if (time > repeatTimes - 1) {
      return Promise.reject({
        message: `请求次数超过${repeatTimes}次`,
        lastResponse,
      });
    }

    return new Promise((resolve) => {
      time += 1;
      fetchMock(params)
        .then((result) => {
          console.log('请求成功返回结构', result);
          resolve(result);
        })
        .catch((error) => {
          console.log('请求遇到错误 再次请求', error);
          setTimeout(() => {
            resolve(repeatRequest(params));
          }, delay);
        });
    });
  }

  return repeatRequest;
}
