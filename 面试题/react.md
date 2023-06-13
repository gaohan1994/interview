# react diff 原理

分两种主要：对单节点 diff，对多节点 diff

- 单节点 diff
  下次要渲染的节点是否在当前渲染树上有对应的 fiber 如果没有说明这个节点是新的直接创建
  如果有对比 key 是否相同不相同则直接删除当前节点并创建新节点
  如果相同则对比 type 如果 type 不同则不复用删除当前节点并创建新节点
  如果 type 相同则使用新的传入的 jsx 的 props 复用当前渲染树上的 fiber

- 多节点 diff
  核心是 2 轮遍历，优先处理更新的节点

  - 第一轮遍历
    直到第一个 key 不相同的元素为止

    - 最好情况这次遍历数量一致 key 一致，直接复用当前树的节点就好
    - 如果有一边遍历完了另一边没遍历完，则执行 新增/删除 操作就好

  - 第二轮遍历
    - 当第一轮遍历结束且还有剩余节点没有遍历到，说明有 key 不相同，这时把当前 fiber 以及其兄弟节点转成 map 类型
    - 拿到第一次遍历时结束时候的节点 index 对比下次渲染的 key 是否在 map 中存在，如果存在则比较旧 index 和 lastIndex 的大小
      如果旧 index >= lastIndex 则不动 lastIndex = 当前节点旧 index
      如果旧 index < lastIndex 则打上移动的标记

# react 组件通信方式

1、直接传值
2、时间总线
3、useContext
4、redux 等库

# react 更新原理

在 react 中可以触发更新的事件
1、reactdom.render
2、this.setstate
3、this.forceupdate
4、usestate
5、usereducer

他们基本上复用了一套逻辑 Update

流程大概是

- 触发状态更新
- 创建 Update 对象
- 从触发状态的 fiber 找到对应的 rootFiber（markUpdateLaneFromFiberToRoot）
- 调度更新 ensureRootIsScheduled
- render 阶段 performSyncWorkOnRoot 或者 performConcurrentWorkOnRoot
- commit 阶段 commitRoot

# react classcomponent 中触发更新的顺序以及打印结果

```javascript
this.setstate => this.updater.enqueueSetState(this, partialState, callback, 'setState');
  componentDidMount = () => {

    setTimeout(() => {
      this.setState({ value: this.state.value + 1 });
      console.log('宏任务1 开启异步 4 + 1 = 5', this.state.value);

      this.setState({ value: this.state.value + 1 });
      console.log('宏任务1 开启异步 5 + 1 = 6', this.state.value);
    }, 0);

    this.setState({ value: this.state.value + 1 });
    this.setState({ value: this.state.value + 1 });
    this.setState({ value: this.state.value + 1 });
    console.log('宏任务1 = 0', this.state.value);
    this.setState({ value: this.state.value + 2 }, () => {
      this.setState({ value: this.state.value + 3 });
      console.log('微任务1 = 1', this.state.value);
    });
    this.setState({ value: this.state.value + 1 });
    console.log('宏任务2 = 0', this.state.value);
  };
```

# react-router 原理

- 书写方法

```javascript
<HashRouter>
  <Router path="/">
    <Component />
  </Router>
</HashRouter>;

class HashRouter extends React.Component {
  history = createHistory(this.props);
  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location,
    };
  }

  render() {
    return (
      <ReactContent.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        {children}
      </ReactContent.Provider>
    );
  }
}
```

- 两种模式 第一种 hash 第二种 broswer
