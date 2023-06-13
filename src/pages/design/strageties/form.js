/**
 * 建立策略模式校验表单
 *
 * @Author: centerm.gaohan
 * @Date: 2021-10-29 16:44:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-10-29 17:28:33
 */
import React from 'react';
import { info } from 'autoprefixer';
import { apply } from 'file-loader';

const stragies = {
  notNull: function (value, errorMessage) {
    if (!value) {
      return errorMessage;
    }
  },

  minLength: function (length, value, errorMessage) {
    if (value.length < length) {
      return errorMessage;
    }
  },
};

/**
 * const validator = new Validator();
 *
 * validator.add('username', [{
 *  stragety: 'notNull',
 *  value: value,
 *  errorMessage: '长度不能为空'
 * }, {
 *  stragety: 'minLength:8',
 *  value: value,
 *  errorMessage: '长度最少8位'
 * }]);
 *
 * @author Ghan
 * @class Validator
 */
class Validator {
  constructor() {
    this.cache = new Map();
  }

  /**
   * 添加策略
   */
  add(name, payload) {
    let currentValidator = [];
    if (this.cache.has(name)) {
      currentValidator = this.cache.get(name);
    }

    for (let i = 0; i < payload.length; i++) {
      let currentPayload = payload[i];
      let stragety = [].shift.call(currentPayload);
      const [stragetyName, stragetyParams] = stragety.split(':');
      [].unshift.call(currentPayload, stragetyParams);

      currentValidator.push(function () {
        return stragies[stragetyName](...currentPayload);
      });
    }
  }

  /**
   * 全部执行
   */
  start() {
    const caches = Array.from(this.cache);
    this.cache.clear();
    for (let i = 0; i < caches.length; i++) {
      const currentFunction = caches[i];
      const result = currentFunction();
      if (result) {
        return result;
      }
    }
  }
}

export default function () {
  const onCheck = () => {
    console.log('oncheck');
  };
  return (
    <div>
      strageties form page
      <button onClick={onCheck}>check</button>
    </div>
  );
}
