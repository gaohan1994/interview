/**
 * 给出 promise 的取消 和 监控进度 api
 *
 * @Author: centerm.gaohan
 * @Date: 2021-10-27 15:27:00
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-10-27 18:40:01
 */
import React, { useRef, useEffect } from 'react';
/**
 * 取消 Promise
 *
 * 1、创建取消令牌
 * 2、取消的时候执行取消函数
 *
 * @author Ghan
 * @class PromiseCancelToken
 * @extends {Promsie}
 */
class PromiseCancelToken {
  /**
   * 取消 promise 的执行函数
   * @author Ghan
   * @param {*} cancelExecute
   * @memberof PromiseCancelToken
   */
  constructor(cancelExecute) {
    this.promise = new Promise((resolve) => {
      cancelExecute(resolve);
    });
  }
}

/**
 * 可通知进度的promise
 *
 * 1、可以设置 notify 通知
 * 2、设置 nofity 的值
 * 3、在实例上通过 notify 调用
 *
 * @author Ghan
 * @class TrackablePromsie
 * @extends {Promise}
 *
 * const promise = new TrackablePromsie((resolve, reject, notify) => {
 *  let x = 5;
 *  while (x > 0) {
 *    x--;
 *    notify(x);
 *  }
 *
 *  resolve();
 * })
 *
 * promise.notify((status) => {
 *  console.log('status:', status);
 * })
 */
class TrackablePromsie extends Promise {
  constructor(exector) {
    const notifycations = [];

    super((resolve, reject) => {
      return exector(resolve, reject, (status) => {
        notifycations.map((notifyFunc) => notifyFunc(status));
      });
    });

    this.notifycations = notifycations;
  }

  notify(handle) {
    this.notifycations.push(handle);
    return this;
  }
}

export default function PromisePage() {
  const CancelPromiseButtonRef = useRef(null);

  const onHandlePromise = () => {
    const cancelButton = document.getElementById('cancel-button');
    /**
     * 创建 promise 并给其绑定上 cancel 令牌
     */
    const promise = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        resolve();
      }, 2000);

      // 创建撤销令牌
      const cancelToken = new PromiseCancelToken((cancelCallback) => {
        // 把撤销回调绑定到button上
        cancelButton.style.display = 'block';
        cancelButton.addEventListener('click', () => {
          console.log('canceled');
          cancelCallback();
        });
      });

      // 设置具体的撤销函数
      cancelToken.promise.then(() => {
        id && clearTimeout(id);
        cancelButton.style.display = 'none';
      });
    });

    promise.then((res) => {
      console.log('promise resolve!');
    });
  };

  useEffect(() => {
    const promise = new TrackablePromsie((resolve, reject, notify) => {
      function countdown(x) {
        if (x > 0) {
          notify(x);
          setTimeout(() => {
            countdown(x - 1);
          }, 1000);
        } else {
          resolve();
        }
      }

      countdown(5);
    });
    console.log('promise', promise);

    promise.notify((status) => {
      console.log('status:', status);
    });
  }, []);

  return (
    <div>
      promise page
      <button onClick={onHandlePromise}>start promise 10s </button>
      <button
        ref={CancelPromiseButtonRef}
        id="cancel-button"
        style={{ display: 'none' }}
      >
        cancel promsie
      </button>
    </div>
  );
}
