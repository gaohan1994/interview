## Dom 事件流

事件流分三个阶段
1、捕获阶段 从 window 到目标节点传播的过程
2、目标阶段 在目标节点处理事件的过程
3、冒泡阶段 从目标节点自下而上返回到 window 节点的过程

执行顺序
父级节点捕获 > （子节点捕获 > 子节点冒泡 或者 冒泡 > 捕获 看书写顺序 ） > 父节点冒泡

## addEventListener 默认是冒泡还是捕获

默认是冒泡可以通过第三个参数指定为捕获

```javascript
document.addEventListener('click', function); // 默认冒泡
document.addEventListener('click', function, false); // 捕获
```

## 什么是事件代理

不给每个子元素设置事件监听函数，而是在子元素的父级设置监听函数利用事件冒泡机制触发事件

## 手写一个事件代理

```js
function onMenuClick(event) {
  const target = event.target;
  const id = target.getAttribute('id');

  if (id === '1') {
    something();
  }
}

<ul onClick={onMenuClick}>
  <li id="1">1</li>
  <li id="2">2</li>
  <li id="3">3</li>
</ul>;
```
