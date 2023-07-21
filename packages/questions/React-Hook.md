https://react.iamkasong.com/hooks/create.html#update%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84

# hook 理念

# Mount | Update

在 Mount 和 Update 阶段调用的 hook 是不同的函数

# Hook

hook quene 会保存在 fiber 对象的 memoizedState 中

```javascript
hook = {
  quene: {
    pending: null,
  },
  memoizedState: initialzieState,
  next: null,
};
```

## Update

更新 产生 Update。
update 对象保存在 hook 的 quene 中
quene 是一个环状单向链表，如果只有一个 update 则

quene.pending = update1;
update1.next = update1;

如果有 2 个 update 则

quene.pending = update2;
update2.next = update1;
update1.next = update2;

quene.pending 始终指向最后生成的 update，而最后的 update 对象始终指向第一个 update

## 注意

hook 与 FunctionComponent fiber 都存在 memoizedState 属性，不要混淆他们的概念。

fiber.memoizedState：FunctionComponent 对应 fiber 保存的 Hooks 链表。

hook.memoizedState：Hooks 链表中保存的单一 hook 对应的数据。

```javascript
/**
 * 1、
 */
function useState(initialState) {
  let hook;

  if (isMount) {
    hook = {
      quene: {
        pending: null,
      },
      memoizedState: initialState,
      next: null,
    };

    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      fiber.memoizedState.next = hook;
    }

    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = hook.next;
  }

  let baseState = hook.memoizedState;

  if (hook.quene.pending) {
    let firstUpdate = hook.quene.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.quene.pending.next);

    hook.quene.pending = null;
  }

  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.quene)];
}
```

## useRef

useRef 是一个 hook，可以引用渲染不需要的值

```javascript
const ref = useRef(initializeValue);

ref.current;
```

useRef 返回一个含有 current 的对象，current 被赋值 initializeValue，你可以修改为其他内容
如果将 ref 对象作为 jsx 节点的属性传递给 React，React 将设置其 current 属性。

# useEffect & useLayoutEffect

useEffect 在 commit 阶段 before matation 阶段被调度

与 componentDidMount、componentDidUpdate 不同的是，在
浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。
这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况
因此不应在函数中执行阻塞浏览器更新屏幕的操作。

useLayoutEffect
在 commit 阶段的 matation 阶段执行销毁函数
在 commit 阶段的 layout 阶段执行回调函数
所以 useLayoutEffect 是同步执行的

而 useEffect 在 before matation 阶段调度
在 commit 阶段的 layout 阶段完成之后异步执行
