import React, { Suspense } from 'react';
import ReactDom from 'react-dom';
import pic from '../hms.png';
import './index.less';
import { Provider } from 'react-redux';
import { reduxStore } from './store';
import AppRouter from './router';
// import loadable from '@loadable/component';

function App() {
  return (
    <Provider store={reduxStore}>
      <AppRouter />
      {/* <Suspense fallback={<div>loading</div>}>
        <Comp1 />
      </Suspense> */}
      {/* <img src={pic} /> */}
    </Provider>
  );
}

ReactDom.render(<App />, document.getElementById('root'));

// 1、个人介绍
// 围绕项目提问

// url输入到看到页面发生了什么
// 跨域
// http1.0 http1.1 http2.0 https

// webpack 优化 splitchunk
// 骨架屏

// js 函数提升问题

// didmount里面设置setstate 然后同步打印
// 和放在settimeout里面设置setstate后打印

// 还有浏览器时间循环 eventloop

// 开放题 一道压轴
// 实现一个方法 里面发起一个请求 同时只能执行一个 然后10秒内出错 可以最多重试3次

// 还是那个splitchunk 问有个首屏初始化 最大分报数的字段 改大有什么好处 为什么
// 设计一个组件库 你觉得要有什么
// 有觉得你做过什么有成就的事
// 主题切换怎么做
