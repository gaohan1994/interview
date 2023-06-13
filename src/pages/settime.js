import React from 'react';

export default class SetTime extends React.Component {
  state = {
    value: 0,
  };

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
    this.setState({ value: this.state.value + 2 }, () => {
      this.setState({ value: this.state.value + 3 });
      console.log('微任务1 = 1', this.state.value);
    });
    this.setState({ value: this.state.value + 1 });

    // setTimeout(() => {
    //   this.setState({ value: this.state.value + 1 });
    //   console.log('this.state', this.state.value);
    //   this.setState({ value: this.state.value + 10 });
    //   console.log('this.state', this.state.value);
    // }, 0);
    // this.setState({ value: 1 }, () => {
    //   this.setState({ value: 8 });
    //   setTimeout(() => {
    //     this.setState((prev) => {
    //       return {
    //         ...prev,
    //         value: prev.value + 1,
    //       };
    //     });
    //     console.log('this.state.value', this.state.value);
    //   }, 0);
    // });
    // setTimeout(() => {
    //   this.setState({ value: this.state.value + 1 });
    //   console.log('宏任务1', this.state.value);
    //   this.setState({ value: this.state.value + 1 });
    //   console.log('宏任务1', this.state.value);
    // }, 0);
  };

  render() {
    // console.log('this.state', this.state);
    return <div>settime{this.state.value}</div>;
  }
}
