https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/100

- display: none
  使元素完全从 dom 树中消失，不占用空间，不能点击
  触发回流

- opacity: 0
  元素不会从 dom 树中消失，继续占据空间，但是内容不可见，不能点击
  触发重绘

- visibility: hidden
  元素不会从 dom 树中消失，继续战绩空间，但是内容不可见，可以点击
  触发重绘
  可以通过修改子孙节点的 visibility: visible 让其显示
