参考地址 https://juejin.cn/post/7167335700424196127

1、rAF 时代

在 React 16 之前 React 采用的是 rAF + postMessage 来实现
将事件传入 rIC ，rIC 会调用 rAF 封装当前帧事件执行的 deadline
利用 postMessage 创建一个宏任务

当接收到 message 的时候（浏览器执行完其他高优先级的任务了）尝试执行回调函数

```javascript
let scheduledRICCallback = undefined;
let animteFrame = 33;
let frameDeadline = 0;

var frameDeadlineObject = {
  timeRemaining: function () {
    return frameDeadline - performance.now();
  },
};

function idleTick() {
  scheduledRICCallback(frameDeadlineObject);
}

window.addListener("message", idleTick, false);

function animateTick(animteTime) {
  frameDeadline = animteTime + animteFrame;
  window.postMessage("requestIdleCallback$1", "*");
}

function rIC(callback) {
  scheduledRICCallback = callback;
  requestAnimationFrame(animateTick);
  return 0;
}
```

在 React 16.2 的时候取消使用了 rAF

首先是 rAF 自身的设计，当浏览器处于 hidden 的情况下，为了提高电池寿命，rAF 会进入暂停调用或低频率调用的状态，这对 react 的事件系统也是有影响的。

更主要的原因是 react 希望重构他的事件系统
期望 执行 react 事件 -> 让出线程给浏览器 -> 再执行一部分 react 事件 -> 让出线程给浏览器的事件循环

2、React 18 实现的 message loop

- MessageChannel
  当 MessageChannel postMessage 的时候会创建宏任务

改版后的调度函数改名为 requestHostCallback 调用后会执行 schedulePerformWorkUntilDeadline
他的任务就是向 channel 发送空包创建宏任务告诉浏览器你忙完你的之后执行我的任务

当浏览器接收到 channel 的消息时，也就是说目前浏览器空闲，开始调度任务

```javascript
let scheduledHostCallback = undefined;
let isMessageLoopRunning = false;

const messageChannel = new MessageChannel();

// port1 用来接收消息，调度时间执行
messageChannel.port1.onmessage = performWorkUntilDeadline;

// port2 用来触发宏任务
const port = messageChannel.port2;
let schedulePerformWorkUntilDeadline = () => {
  // post一个空包数据创建宏任务
  port.postMessage(null);
};

function requestHostCallback(callback) {
  scheduledHostCallback = callback;

  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    schedulePerformWorkUntilDeadline();
  }
}

function performWorkUntilDeadline() {
  if (!scheduledHostCallback) {
    const currentTime = getCurrentTime();
    startTime = currentTime;

    const hasTimeRemaining = true;

    let hasMoreWork = true;
    try {
      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
    } finally {
      if (hasMoreWork) {
        schedulePerformWorkUntilDeadline();
      } else {
        isMessageLoopRunning = false;
        scheduledHostCallback = undefined;
      }
    }
  } else {
    isMessageLoopRunning = false;
  }
}

function flushWork(hasTimeRemaining, currentTime) {
  return workLoop(hasTimeRemaining, currentTime);
}

const taskQuene = [];

let currentTask = null;

function workLoop(hasTimeRemaining, currentTime) {
  currentTask = taskQuene[0];

  while (currentTask != null) {
    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
      break;
    }

    currentTask.callback();
    taskQuene.shift();

    currentTask = taskQuene[0];
  }

  if (currentTask != null) {
    return true;
  } else {
    return false;
  }
}

const frameInterval = 5;

function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - startTime;
  if (timeElapsed < frameInterval) {
    return false;
  }
  return true;
}
```
