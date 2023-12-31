## React 最小堆

参考 [https://juejin.cn/post/7168283003037155359]

## 什么是最小堆

- 二叉树
  具有左右子节点的树形结构

- 完全二叉树
  除最后一层外其余层都是满的，且最后一层是满的，如果右边连续缺少若干节点的二叉树

- 二叉堆
  满足完全二叉树的前提下
  当父节点的键值总是大于或等于任何一个子节点的键值时为“最大堆”（max heap）。
  当父节点的键值总是小于或等于任何一个子节点的键值时为“最小堆”（min heap）。

React 的 taskQuene 使用的就是最小堆
在最小堆中，最小值就在第一个，可以快速取出最小值，
React 为什么使用最小堆?
React 将更新任务拆分成多个小任务，每个任务的数据结构是一个带着 expirationTime 属性的对象，
expirationTime 表示这个任务过期的时间，当 expirationTime 越小是表示这个任务优先级越高，取出最小值相当于取出优先级最高的任务。

## 实现一个最小堆

React 的最小堆涉及 5 个函数：

push，往最小堆插入新节点
pop，删除根节点，就是那个最小的值
siftUp，上浮，不停地交换节点和父节点
shiftDown，下沉，不停地交换节点和子节点
peek，获取根节点，也就是数组的第一个元素，也就是优先级最高的那个任务
