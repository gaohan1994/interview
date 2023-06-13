import React, { useEffect } from 'react';

/**
 * 写一个事件委托
 *
 * 一个ul列表内有100个li每个子元素显示为下标 + 1
 * 点击时alert 当前元素 及其平方值
 */

const data = new Array(100).fill({}).map((_, index) => index + 1);

export default function EventDom() {
  useEffect(() => {
    const ulElement = document.getElementById('eventul');
    ulElement.addEventListener('click', clickHandle);

    return () => {
      ulElement.removeEventListener('click', clickHandle);
    };
  });

  const clickHandle = function ulListClickHandle(event) {
    const target = event.target;
    if (target.nodeName.toLowerCase() === 'li') {
      const index = target.getAttribute('data-index');
      const node = data[index];
      liHandle(node);
    }
  };

  const liHandle = function liDataHandle(item) {
    alert(`点击元素${item}, ${item}平方值${Math.pow(item, 2)}`);
  };

  return (
    <div>
      {/* <ul id="eventul">
        {data.map((item, index) => {
          return (
            <li key={item} id={`li-${item}`} data-index={index}>
              {item}
            </li>
          );
        })}
      </ul> */}

      <div>ssd</div>
    </div>
  );
}

const Update = {
  action,

  next: null,
};

function dispatchAction(quene, action) {
  const update = {
    action,

    next: null,
  };

  // 环状单向链表操作
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
}

function useState(initValue, callback) {
  let hook;

  if (isMount) {
    hook = {
      queue: {
        pending: null,
      },
      memoizedState: initialState,
      next: null,
    };

    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState;

  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.quene)];
}
