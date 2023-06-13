import React, { useRef, useState, useEffect } from 'react';
import ReactDom from 'react-dom';

/**
 * 这是一个插件
 */
const plugin = (function () {
  let plugin = document.createElement('embed');
  plugin.style.display = 'none';
  plugin.type = 'application/txftn-webkit';

  plugin.sign = function () {
    console.log('开始扫描文件');
  };
  plugin.pause = function () {
    console.log('暂停上传');
  };
  plugin.uploading = function () {
    console.log('开始上传文件');
  };
  plugin.del = function () {
    console.log('删除上传文件');
  };
  plugin.done = function () {
    console.log('文件上传完成');
  };

  document.body.appendChild(plugin);
  return plugin;
})();

class BaseState {
  handlePause() {
    throw new Error('子类必须实现handlePause');
  }

  handleDelete() {
    throw new Error('子类必须实现handleDelete');
  }
}

const StateFactory = (function () {
  return function (params) {
    class CurrentState extends BaseState {
      constructor(uploadObj) {
        super();
        this.uploadObj = uploadObj;
      }
    }

    for (let key in params) {
      CurrentState.prototype[key] = params[key];
    }

    return CurrentState;
  };
})();

const SignState = StateFactory({
  handlePause: function () {
    console.log('扫描时无法暂停');
  },
  handleDelete: function () {
    console.log('扫描时无法删除');
  },
});

const UploadingState = StateFactory({
  handlePause: function () {
    this.uploadObj.pause();
  },
  handleDelete: function () {
    console.log('上传时无法删除');
  },
});
const PauseState = StateFactory({
  handlePause: function () {
    this.uploadObj.uploading();
  },
  handleDelete: function () {
    this.uploadObj.del();
  },
});
const DoneState = StateFactory({
  handlePause: function () {
    console.log('文件上传完成');
  },
  handleDelete: function () {
    this.uploadObj.del();
  },
});

/**
 * 实现一个upload模块
 * 两个按钮 暂停和删除
 */

class Upload {
  constructor(fileName) {
    this.id = null;
    this.fileName = fileName;
    this.plugin = plugin;
    this.buttonPause = null;
    this.buttonDelete = null;
    this.signState = new SignState(this);
    this.uploadingState = new UploadingState(this);
    this.pauseState = new PauseState(this);
    this.doneState = new DoneState(this);

    this.currentState = this.signState;
    this.dom = null;
  }

  /**
   * 初始化
   */
  init(ref) {
    this.id = `${+new Date()}`;
    this.dom = document.createElement('div');
    this.dom.innerHTML = `
      <span>文件名称:${this.fileName}</span>
      <button data-action="button1">扫描中</button>
      <button data-action="button2">删除</button>
    `;

    const node = ReactDom.findDOMNode(ref.current);
    node.append(this.dom);

    // 注册事件
    this.bindEvent();
  }

  // 绑定事件
  bindEvent() {
    this.buttonPause = this.dom.querySelector('[data-action="button1"]');
    this.buttonDelete = this.dom.querySelector('[data-action="button2"]');

    this.buttonPause.onclick = () => {
      this.currentState.handlePause();
    };
    this.buttonDelete.onclick = () => {
      this.currentState.handleDelete();
    };
  }
  sign() {
    this.plugin.sign();
    this.currentState = this.signState;
  }
  pause() {
    this.buttonPause.innerHTML = '已暂停，点击继续上传';
    this.plugin.pause();
    this.currentState = this.pauseState;
  }
  uploading() {
    this.buttonPause.innerHTML = '正在上传，点击暂停';
    this.plugin.uploading();
    this.currentState = this.uploadingState;
  }
  del() {
    this.plugin.del();
    this.dom.parentElement.removeChild(this.dom);
  }
  done() {
    this.plugin.done();
    this.currentState = this.doneState;
  }
}
export default function UploadPage() {
  const ref = useRef(null);

  const onAdd = () => {
    const upload = new Upload('javscript 设计模式');
    upload.init(ref);
  };

  useEffect(() => {
    const upload = new Upload('javscript 高级程序设计');
    upload.init(ref);

    window.external.upload = function (state) {
      upload[state]();
    };

    setTimeout(() => {
      window.external.upload('uploading');
    }, 1000);
  }, []);

  return (
    <div>
      upload page
      <div ref={ref} id="upload-container"></div>
      <button onClick={onAdd}>upload file</button>
    </div>
  );
}
