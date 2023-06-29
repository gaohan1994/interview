Promise.all2 = function (promises) {
  let count = 0;
  let result = [];

  return new Promise((resolveAll, rejectAll) => {
    promises.forEach((currentPromise, index) => {
      Promise.resolve(currentPromise)
        .then(currentResult => {
          result[index] = currentResult;

          if (count === promises.length) {
            resolveAll(result);
          }
        })
        .catch(currentError => {
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
        .then(currentResult => {
          resoveRace(currentResult);
        })
        .catch(currentError => {
          rejectRace(currentError);
        });
    }
  });
};

// 使用Promise实现每隔1秒输出1,2,3
// {
//   let arr = [1, 2, 3];

//   arr.reduce((prevPromise, currentValue) => {
//     return prevPromise.then(() => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(console.log(currentValue));
//         }, 1000);
//       });
//     });
//   }, Promise.resolve());
// }

// 使用Promise实现红绿灯交替重复亮;
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

{
  function red() {
    console.log("red");
  }
  function green() {
    console.log("green");
  }
  function yellow() {
    console.log("yellow");
  }
  function light(time, callback) {
    return new Promise(resolve => {
      setTimeout(() => {
        callback();
        resolve();
      }, time);
    });
  }

  function step() {
    Promise.resolve()
      .then(() => {
        return light(3000, red);
      })
      .then(() => {
        return light(2000, yellow);
      })
      .then(() => {
        return light(1000, green);
      })
      .then(() => {
        return step();
      });
  }

  // step();
}

// mergePromise
// 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
{
  const time = timer => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timer);
    });
  };
  const ajax1 = () =>
    time(2000).then(() => {
      console.log(1);
      return 1;
    });
  const ajax2 = () =>
    time(1000).then(() => {
      console.log(2);
      return 2;
    });
  const ajax3 = () =>
    time(1000).then(() => {
      console.log(3);
      return 3;
    });

  function mergePromise() {
    // 在这里写代码
  }
  // mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  //   console.log('done');
  //   console.log(data); // data 为 [1, 2, 3]
  // });

  // 要求分别输出
  // 1
  // 2
  // 3
  // done
  // [1, 2, 3]
  function mergePromise(ajaxArray) {
    // 存放每个ajax的结果
    const data = [];
    let promise = Promise.resolve();
    ajaxArray.forEach(ajax => {
      // 第一次的then为了用来调用ajax
      // 第二次的then是为了获取ajax的结果
      promise = promise.then(ajax).then(res => {
        data.push(res);
        return data; // 把每次的结果返回
      });
    });
    // 最后得到的promise它的值就是data
    return promise;
  }
}

// 限制异步操作的并发个数并尽可能快的完成全部
{
  var urls = [
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
  ];
  function loadImg(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        console.log("一张图片加载完成");
        resolve(img);
      };
      img.onerror = function () {
        reject(new Error("Could not load image at" + url));
      };
      img.src = url;
    });
  }

  function mutiRequest(urls, maxNumber) {
    let result = [];
    let currentRequestIndex = 0;

    function request(resolveAll) {
      return new Promise(resolve => {
        if (result.length >= urls.length) {
          resolveAll(result);
          return;
        }

        const currentRequestUrl = urls[currentRequestIndex];
        Promise.resolve(loadImg(currentRequestUrl))
          .then(img => {
            result[currentRequestIndex] = img;
          })
          .then(() => {
            currentRequestIndex++;
            request(resolveAll);
          });
      });
    }

    return new Promise(resolveAll => {
      while (currentRequestIndex < maxNumber) {
        request(resolveAll);
      }
    });
  }
}
