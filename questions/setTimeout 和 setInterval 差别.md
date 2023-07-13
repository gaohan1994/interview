# setInterval 的缺陷

当使用 setInterval 调度函数的时候，如果因为函数本身或者其他原因导致在 x 时间内没有执行完第一次函数
但是第二次函数已经调度，如果 x 超过调度时间，并不会立即执行第二次函数

# 使用 setTimeout 模拟 setInterval

```javascript
class MySetInterval {
  timer = undefined;
  executer = undefined;

  repeat = (executer, time) => {
    if (this.executer === undefined) {
      this.executer = executer;
    }

    this.timer = setTimeout(() => {
      executer();
      this.repeat(this.executer, time);
    }, time);
  };

  clear = () => {
    clearTimeout(this.timer);
    this.timer = undefined;
  };
}

const timer = new MySetInterval();
timer.repeat(() => {
  console.log(1);
}, 1000);
```
