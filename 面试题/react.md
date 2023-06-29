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
