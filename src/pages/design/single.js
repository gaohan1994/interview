/**
 * 单例模式
 * 这个模式在日常开发过程中经常使用
 *
 * @Author: centerm.gaohan
 * @Date: 2021-10-29 16:25:58
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-10-29 16:41:51
 */

/**
 * 创建全局唯一的登录窗口
 */
{
  const createSingleLoginLayer = (function () {
    let instance;

    function createLoginLayer() {
      let div = document.createElement('div');
      div.innerHTML = 'this is login modal';
      document.body.appendChild(div);
      return div;
    }

    return {
      create: function () {
        if (instance) {
          return instance;
        }

        instance = createLoginLayer();
        return instance;
      },
    };
  })();
}

{
  /**
   * 创建通用的全局单例模式
   */
  function createSingle(createConstructor) {
    let instance;

    return function () {
      if (instance) {
        return instance;
      }

      instance = createConstructor.apply(this, arguments);
      return instance;
    };
  }

  function createLoginLayer() {
    const div = document.createElement('div');
    div.innerHTML = 'this is login modal';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
  }

  const loginSingleLayer = createSingle(createLoginLayer);

  function createIframe(src) {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    return iframe;
  }
  const iframeSingle = createSingle(createIframe);
}
