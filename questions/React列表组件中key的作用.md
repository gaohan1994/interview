07-03

# 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

我的回答：

React 为了实现效率架构了虚拟 dom 这一概念
进而引出了复用 dom 的需求
但是，即时使用最前沿的算法，完全对比两个树的时间复杂度也要 O(n^3)

所以 React 限定了 3 个规则来使复杂度降到 O(n)
1、不同类型的 dom 不复用
2、跨级 dom 不复用
3、可以手动设置 key

在多节点 diff 算法中，遍历新老节点，直到第一个不同的节点
如果这个时候新老节点都还有剩余节点
则把老的节点树转为 map 且 key 为我们设置的 key
lastOldIndex = 最后一个相同节点的 oldIndex

开始遍历新节点
当节点 oldIndex < lastOldIndex 不动
如果 oldIndex > lastOldIndex 则打上移动的标签，且 lastOldIndex = oldIndex
