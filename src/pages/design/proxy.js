import React from 'react';
import loadingImg from '../../assets/3.png';

Function.prototype.before = function (beforeFunc) {
  let self = this;

  return function () {
    beforeFunc.apply(this, arguments);
    return self.apply(this, arguments);
  };
};

Function.prototype.before1 = function (beforeFunc) {
  let self = this;

  return function () {
    beforeFunc.apply(this, arguments);
    return self.apply(this, arguments);
  };
};

/**
 * 实现
 * 1、怎么给图片加token
 * 2、没有权限时不显示图片
 * 3、预加载显示loading
 */

const RenderImage = (function () {
  let imageNode = document.createElement('img');
  document.body.appendChild(imageNode);
  return {
    setSrc: function (src) {
      imageNode.src = src;
    },
  };
})();

/**
 * 创建图片代理
 */
let ProxyImage = (function () {
  const image = new Image();

  image.onload = function () {
    RenderImage.setSrc(this.src);
  };
  return function ({ src, loading }) {
    RenderImage.setSrc(loading);
    image.src = src;
  };
})();

/**
 * 这里进行一个操作
 * 1、判断是否有权限
 * 2、如果有权限则给图片链接加token
 * 3、如果没权限则显示loading
 */
const addAuthImage = function (params) {
  const hasToken = Math.random() > 0.5;
  if (hasToken) {
    params.src += '&token=injectTokenToProxyImage';
  } else {
    params.src = params.loading;
  }
};

/**
 * 利用AOP的思想把权限相关代码注入ProxyImage
 * 也是装饰器模式
 */
ProxyImage = ProxyImage.before(addAuthImage);

export default function ProxyPage() {
  const addImage = () => {
    ProxyImage({
      src:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-bb66e3dd9faf8ad8a82721a1be13ba7a_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637741948&t=9721d3cfb79d0befe1706daa5cc40642',
      loading: loadingImg,
    });
  };
  return (
    <div>
      ProxyPage
      <button onClick={addImage}>click</button>
    </div>
  );
}

/**
 * 设置img 并设置 img的src
 *
 * 这个函数只渲染img 并修改 img src
 */
const RenderImage1 = (function () {
  let img = document.createElement('img');
  document.body.appendChild(img);
  return {
    setSrc: function (src) {
      img.src = src;
    },
  };
})();

/**
 * 代理图片
 * 1、设置图片loading图
 */
let ProxyImage1 = (function () {
  const img = new Image();
  img.onload = function () {
    RenderImage1.setSrc(this.src);
  };

  return function ({ src }) {
    RenderImage1.setSrc(loading);
    img.src = src;
  };
})();

const addAuth = function ({ src }) {
  const getToken = () => 'token';
  const token = getToken();
  src += `&token=${token}`;
};

const AddAuthProxyImage = ProxyImage1.before(addAuth);
