/**
 * 发布-订阅模式
 * 相当于 EventEmitter
 * @Author: centerm.gaohan
 * @Date: 2021-10-25 17:02:51
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-10-27 10:21:23
 */
import React from 'react';
import EventHeader from './Event/header';
import EventNav from './Event/nav';

// 手写一个 event emmiter
class EventEmiter {
  constructor() {
    // 事件集合
    // { key: Array<T> }
    this.map = new Map();
  }
  /**
   * 注册事件
   * 可能有多个注册函数
   */
  on(eventName, func) {
    if (this.map.has(eventName)) {
      // 如果已经有该事件，则继续向该事件添加函数
      const prevEventCallbacks = this.map.get(eventName);
      prevEventCallbacks.push(func);
      this.map.set(prevEventCallbacks);
    } else {
      // 没有该事件
      this.map.set(eventName, [func]);
    }
  }

  /**
   * 取消注册事件
   *
   * @author Ghan
   * @param {*} eventName
   * @param {*} func
   * @memberof EventEmiter
   */
  off(eventName, func) {
    if (this.map.has(eventName)) {
      const prevEventCallbacks = this.map.get(eventName);
      for (let i = 0; i < prevEventCallbacks.length; i++) {
        const currentCallback = prevEventCallbacks[i];
        if (currentCallback === func) {
          prevEventCallbacks.splice(i, 1);
          return;
        }
      }
    }
  }

  /**
   * 触发
   */
  emit(eventName) {
    if (!this.map.has(eventName)) {
      return;
    }
    // 执行参数
    const args = Array.prototype.slice.call(arguments, 1);

    const currentCallbacks = this.map.get(eventName);
    for (let i = 0; i < currentCallbacks.length; i++) {
      const currentCallback = currentCallbacks[i];
      currentCallback.apply(this, args);
    }
  }

  /**
   * splice 是否会修改 map 中的数据？
   *
   * @author Ghan
   * @param {*} eventName
   * @param {*} func
   * @return {*}
   * @memberof EventEmiter
   */
  off(eventName, func) {
    if (!this.map.has(eventName)) {
      return;
    }
    const currentCallbacks = this.map.get(eventName);
    for (let i = 0; i < currentCallbacks.length; i++) {
      const currentCallback = currentCallbacks[i];
      if (currentCallback === func) {
        currentCallbacks.splice(i, 1);
        return;
      }
    }
  }
}

export const eventEmiiter = new EventEmiter();

export default function EventPage() {
  const onLoginHandle = () => {
    const loginData = {
      name: 'Ghan',
      age: 27,
      sex: 'man',
    };

    eventEmiiter.emit('login', loginData);
  };

  return (
    <div>
      <EventHeader />
      <EventNav />

      <button onClick={onLoginHandle}>onLogin</button>
    </div>
  );
}
