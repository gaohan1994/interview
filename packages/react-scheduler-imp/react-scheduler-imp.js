import { push, pop, peek } from "./src/ScheduleMinHeap.js";

const getCurrentTime = () => performance.now();

const NoPriority = 0;
const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;

const IMMEDIATE_PRIORITY_TIMEOUT = -1;
const USER_BLOCKING_PRIORITY_TIMEOUT = 250;
const NORMAL_PRIORITY_TIMEOUT = 5000;
const LOW_PRIORITY_TIMEOUT = 10000;
const IDLE_PRIORITY_TIMEOUT = 107341823;

// 普通任务队列
var taskQuene = [];

// 延时任务队列
var timerQuene = [];

var taskIdCounter = 1;

var isPerformingWork = false;

var isHostCallbackScheduled = false;
var isHostTimeoutScheduled = false;

var taskTimeoutID = -1;
var currentTask = null;
var currentPriorityLevel = NormalPriority;

var startTime;

function unstable_schedulerCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime();

  var startTime;

  if (typeof options === "object" && options !== null) {
    var delay = options.delay;

    if (typeof delay === "number" && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
  } else {
    startTime = currentTime;
  }

  var timeout;

  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT;
      break;
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
      break;
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT;
      break;
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT;
      break;
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT;
      break;
  }

  var expirationTime = startTime + timeout;

  var newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };

  if (startTime > currentTime) {
    // 如果是延时任务，则放入延时任务队列
    newTask.sortIndex = startTime;
    push(timerQuene, newTask);

    if (peek(taskQuene) === null && peek(timerQuene) === newTask) {
      // 如果当前普通任务队列空了，且刚插入的延时任务是优先级最高的延时任务,执行这个任务
      if (isHostTimeoutScheduled) {
        // 当前有延迟任务正在调度，取消调度
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      }

      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQuene, newTask);

    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}

function requestHostCallback() {}

function flushWork(hasTimeRemaining, initialTime) {
  isHostCallbackScheduled = false;

  if (isHostTimeoutScheduled) {
    isHostCallbackScheduled = false;
    cancelHostTimeout();
  }

  isPerformingWork = true;
  const previousPriorityLevel = currentPriorityLevel;

  try {
    return workLoop(hasTimeRemaining, initialTime);
  } finally {
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  advanceTimers(currentTime);

  currentTask = peek(taskQuene);

  while (currentTask !== null) {
    if (currentTask.expirationTime > currentTime && shouldYieldToHost()) {
      // 如果应该让出主线程
      break;
    }

    const callback = currentTask.callback;

    if (typeof callback === "function") {
      currentTask.callback = null;
      const continuationCallback = callback();

      if (typeof continuationCallback === "function") {
        // 如果这个任务没有执行完成
        currentTask.callback = continuationCallback;
      } else {
        if (currentTask === peek(taskQuene)) {
          pop(taskQuene);
        }
      }

      currentTime = getCurrentTime();
      advanceTimers(currentTime);
    } else {
      pop(taskQuene);
    }

    currentTask = peek(taskQuene);
  }

  if (currentTask !== null) {
    return true;
  } else {
    const firstTimer = peek(timerQuene);
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }

    return false;
  }
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    // 如果当前没有调度普通任务

    if (peek(taskQuene) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      const firstTimer = peek(timerQuene);
      if (firstTimer.callback !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}

function advanceTimers(currentTime) {
  let timer = peek(timerQuene);
  while (timer !== null) {
    if (timer.callback === null) {
      pop(timerQuene);
    } else if (timer.startTime <= currentTime) {
      pop(timerQuene);
      timer.sortIndex = timer.expirationTime;
      push(taskQuene, timer);
    } else {
      // 剩余的 timer 继续 pending
      return;
    }

    timer = peek(timerQuene);
  }
}

function cancelHostTimeout() {
  clearTimeout(taskTimeoutID);
  taskTimeoutID = -1;
}

function requestHostTimeout(callback, ms) {
  taskTimeoutID = setTimeout(() => {
    callback(getCurrentTime());
  }, ms);
}

let frameInterval = 5;

function shouldYieldToHost() {
  const currentTime = getCurrentTime();
  return currentTime - startTime > frameInterval ? true : false;
}
