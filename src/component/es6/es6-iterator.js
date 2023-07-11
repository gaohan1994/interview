import React, { Fragment, useCallback, useState } from "react";

export const ES6Iterator = () => (
  <Fragment>
    <FibDemo />
    <ActionDemo />
  </Fragment>
);

/**
 * 要求，自定义一个 iterator
 * 返回一个斐波那契数列
 */
let id = 0;
class FibNode {
  constructor(value) {
    this.id = id++;
    this.value = value;
  }
}

const Fib = {
  [Symbol.iterator]() {
    let n1 = new FibNode(1),
      n2 = new FibNode(1);

    return {
      [Symbol.iterator]() {
        return this;
      },

      next() {
        let current = new FibNode(n1.value + n2.value);
        n1 = n2;
        n2 = current;
        return { value: current, done: false };
      },

      return(value) {
        id = 0;
        return { value, done: true };
      },
    };
  },
};

const FibDemo = () => {
  const [value, setValue] = useState(0);
  const [fib, setFib] = useState([]);

  const generateFib = useCallback(() => {
    const result = [];

    for (let fibNode of Fib) {
      result.push(fibNode.value);

      if (fibNode.id > value) {
        id = 0;
        setFib(result);
        break;
      }
    }
  }, [value]);

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={generateFib}>generate fib number {`(start from 2)`}</button>
      <div>result: {fib.length > 0 ? fib.join(",") : `null`}</div>
    </div>
  );
};

/**
 * 要求自定义一个 iterator
 * 执行 action 队列
 * @returns
 */
const ActionDemo = () => {
  const [value, setValue] = useState(0);

  const onAddAction = useCallback(() => {
    const executer = () => {
      return value;
    };
    ActionTask.actions.push(executer);
    console.log("Success add action");
  }, [value]);

  const onRunActions = () => {
    for (let result of ActionTask) {
      console.log("result", result);
    }
  };

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={onAddAction}>Add Action</button>
      <button onClick={onRunActions}>Run Actions</button>
    </div>
  );
};

const ActionTask = {
  [Symbol.iterator]() {
    const actions = this.actions.slice();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next(...rest) {
        if (actions.length > 0) {
          return { done: false, value: actions.shift()(...rest) };
        } else {
          return { done: true };
        }
      },
    };
  },
  actions: [],
};
