## requestAnimationFrame

告诉浏览器，你希望执行一个动画，并要求浏览器在下次重绘之前调用指定的回调函数更新动画
requestAnimationFrame 的执行时机是在 js 之后，layout 和 plant 之前

可以调用 cancelAnimationFrame 清理回调

## requestIdleCallback

插入一个函数，这个函数将会在浏览器空闲的时候被调用，这使开发者可以在主事件循环上执行后台和低优先级任务，而不会影响关键任务，比如动画和用户交互事件。

```typescript

interface IdleCallbackDeadline {
  // 是否在超时时间内完成
  didTimeout: boolean;
  // 尝试获取当前剩余空闲时间 最大为 50ms
  timeRemaining: () => number;
}

interface IdleCallback {
  (deadline: IdleCallbackDeadline): void
}

interface Options {
  timeout: number
}

requestIdleCallback(callback: IdleCallback, options: Options): number
```

如果指定了 timeout 而且在 timeout 时间内还没有调用 callback，那么该任务会放入到事件循环中排队（强制执行）

回调函数中接收一个参数 deadline，有一个 didTimeout 接口返回是否在超时时间内完成

为什么 timeRemaining 最大返回值为 50ms？
因为人体面对事件反应延迟时，在 100ms 内基本无感，所以设定一个 requestIdleCallback 的最大空闲时间为 50 之后浏览器依然还有 50ms 处理用户事件

## 注意

- 对非高优先级的任务使用空闲回调

对于浏览器的繁忙程度这些都是未知的，所以不能保证每次事件循环都能执行 requestIdleCallback

- 空闲回调应尽可能不超支分配到的时间

- 避免在 requestIdleCallback 中改变 DOM，因为执行 requestIdleCallback 时，
  当前帧已经结束绘制了，所有的布局更新和计算已经完成，如果这时改变布局，等于强制浏览器重新计算
  这是不必要的，如果回调需要改变 DOM，则考虑使用 requestAnimationFrame

- 避免运行时间无法预测的任务
  避免在 requestIdleCallback 中执行 Promise 因为 Promise 一旦 resolve 或者 reject
  则会触发执行对应的处理函数，resolve 和 reject 都可能导致 DOM 的变化
