/**
 * 分时函数
 *
 * 一次性渲染1000条数据
 * 改成每 200毫秒渲染8条数据
 */

function renderMessage(message) {
  console.log('message rendered !');
}

let renderChunkFriendsMessage = (function () {
  /**
   * @param chunk 每批渲染8个
   * @param start 开始渲染的下标
   * @param delay 每200毫秒渲染一次
   */
  let chunk = 8;
  let start = 0;
  let delay = 200;
  let timer;

  /**
   * 渲染函数
   * @param {Array<Friend>} friends
   */
  function render(friends) {
    // 当渲染下标 < friends长度 或者 start + chunk 的最小值时 说明还有剩余没渲染
    while (start < Math.min(friends.length, start + chunk)) {
      renderMessage(friends[start]);
      start++;
    }
  }

  return function (friends) {
    timer = setInterval(() => {
      if (start >= friends.length) {
        return clearInterval(timer);
      }

      render(friends);
    }, delay);
  };
})();

/**
 * 创建嗅探函数
 * 兼容IE： attachEvent
 *
 * 要求惰性加载
 */

let addEvent = function (type, element, handler) {
  if (window.addEventListener) {
    addEvent = function (type, element, handler) {
      element.addEventListener(type, handler);
    };
  }

  if (window.attachEvent) {
    addEvent = function (type, element, handler) {
      element.attachEvent('on' + type, handler);
    };
  }
  addEvent(type, element, handler);
};
