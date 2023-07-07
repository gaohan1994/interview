https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/135

二者最终渲染的都是 a 标签

# Link

是 react-router 的组件，结果 a 标签默认跳链行为，区别与传统的 a 标签
Link 跳转只会触发相匹配的 route 对应页面的内容更新，而不会刷新整个页面

# a

正常行为是从当前页面跳转到制定 href

通过 e.defaultPrevented() 阻止默认事件发生。
