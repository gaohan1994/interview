# BFC

blocking format context
块级格式化上下文

是盒页面模型布局中 css 的一种渲染模式，相当于一个容器，里面的元素与外部的元素互相之间不影响
创建 BFC 的方式有

1、根元素
2、float
3、绝对定位
4、overflow 不为 visible
5、display 为 表格 或者 弹性布局

BFC 的主要用途
清除浮动
BFC 元素的垂直方向上会发生边距重叠。
BFC 元素和浮动元素不会发生重叠。
BFC 在计算高度时会把浮动元素计算进去。
BFC 在页面是个独立的容器，里外元素互不影响。
