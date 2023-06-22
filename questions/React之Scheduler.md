## React Scheduler

在 react 中，把更新做成一个个任务放进任务队列中，任务分成不同的优先级、开始事件等，
判断任务的优先级，当任务执行太久，如何中断并让出线程，等浏览器空闲在执行呢
这些就是 Scheduler 做的事

## 调度器

react 调度事件函数为 unstable_schedulerCallback

react 将事件分为 6 个优先级 0-5，每种优先级任务的超时时间不同
调度任务的时候第一步先将传入的 callback 封装成一个 task
如果是延时任务，则 startTime = currentTime + options.delay
expirationTime = startTime + PRIORITY_TIMEOUT;

```javascript
var newTask = {
  id: taskIdCounter++,
  callback,
  priorityLevel,
  startTime,
  expirationTime,
  sortIndex: -1,
};
```

再根据任务的类别（如果是延时任务则 startTime > currentTime）
普通任务插入到普通任务队列
延时任务插入到延时任务队列

插入到队列之后

如果是延时任务判断当前任务是否是优先级最高的延时任务
如果是的话，取消之前的延时任务，并调度延时任务

如果是普通任务且当前并没有开始调度，则开始尝试调度普通任务

【任务队列都是最小堆】这里可以展开说一下最小堆

- 什么是最小堆
- 为什么使用最小堆
- 最小堆的上浮和下沉怎么实现
