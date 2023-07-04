07-03

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17

class 组件中
如果并没有开启微任务和宏任务则无法再当前事件中检测到 state 的改变即 setState 为异步
如果开启了宏任务/微任务则每次触发 setState 立即触发 render 即同步

```jsx
class Component extends React.Component {
  state = {
    value: 0,
  };

  onClick = () => {
    // 1
    console.log(this.state.value);

    this.setState({
      value: 1,
    });

    // 1
    console.log(this.state.value);
  };

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }
}
```

在 function component 中

18 之前，表现形式和 class component 差不多

```jsx
function Compoennt() {
  const [value, setValue] = useState(0);

  const onClick = () => {
    setValue(value + 1);
    setValue(value + 1);
  };

  useEffect(() => {
    setValue(value + 1);
    console.log(value);
    setValue(value + 1);
    console.log(value);

    setTimeout(() => {
      setValue(value + 1);
      console.log(value);

      setValue(value + 1);
      console.log(value);
    }, []);
  }, []);
}
```
