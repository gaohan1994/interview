# css 优先级

!important 会覆盖任何位置的元素样式
内联样式 权重 1000
id 选择器样式 权重 100
类，伪类 权重 10
标签 伪元素选择器 1
通配符子类选择器 0
继承的样式没有权重

# 讲讲 position

static 默认值
处于正常文档流，会忽略掉 left top right bottom 值

relative
相对于元素原来的位置进行相对定位，元素原来的位置会保留，不会脱离文档流

absolute
脱离文档流
1、如果有祖先的 position 设置了 absolute 或者 relative 则相对祖先的位置进行绝对定位
2、如果没有祖先设置 position 则相对 body 进行定位

fixed
总是相对 body 进行定位

sticky
在屏幕范围内不受到定位影响，当要移除屏幕的时候定位变成 fixed 会根据 left top right bottom 等属性形成固定位置的效果
场景是 跟随窗口

inherit
继承父元素的 position

# 水平垂直居中

1、flex

2、
position relative
left: 50%;
top:50%
transform -50% -50%

定宽高
margin-left -widht /2 ;
margin-top -height / 2;

# css 怎么开启硬件加速

- transform
- opacity
- will-change
- filter

# flex:1 是哪些属性组成的

- flex-grow 放大比例 默认 0
- flex-shrink 缩小比例 默认 1， 0 表示不缩小
- flex-basis 属性定义项目在分配额外空间之前的缺省尺寸

# 小球动画

思路
1、获得起始点横纵坐标
2、获得结束点横纵坐标
3、计算获得小球偏移的横纵数值 x, y
4、外层小球横向匀速平移 x，内层小球内塞尔函数偏移 y
5、根据动画的运行时间设置计时器清除小球

内层小球使用 贝塞尔 函数
