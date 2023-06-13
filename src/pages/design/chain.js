/**
 * @Author: centerm.gaohan
 * @Date: 2021-10-24 20:20:26
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-10-25 10:17:07
 */

// 利用 职责链 + 命令模式写一个异步队列

const NEXT_CHAIN_EXECTOR = 'NEXT_CHAIN_EXECTOR';

class Chain {
  constructor(executor) {
    this.executor = executor;
    this.nextChain = null;
  }

  setNextChain(nextChain) {
    this.nextChain = nextChain;
    return this.nextChain;
  }

  next() {
    return (
      this.nextChain && this.nextChain.execute.apply(this.nextChain, arguments)
    );
  }

  execute() {
    const result = this.executor.apply(this, arguments);
    if (result === NEXT_CHAIN_EXECTOR) {
      return (
        this.nextChain &&
        this.nextChain.execute.apply(this.nextChain, arguments)
      );
    }
    return result;
  }
}

let fetchApi1 = new Chain(function (params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...params, age: '27' });
    }, 1000);
  }).then((response) => {
    console.log('fetchApi1 response', response);
    this.next(response);
  });
});

let fetchApi2 = new Chain(function (params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...params, sex: 'man' });
    }, 2000);
  }).then((response) => {
    console.log('fetchApi2 response2', response);
    this.next(response);
  });
});

const MacroAsyncCommand = function () {
  let head = new Chain(function () {
    return NEXT_CHAIN_EXECTOR;
  });

  return {
    chain: null,
    // head: this.chain,

    add: function (asyncCommand) {
      const asycnChain = new Chain(asyncCommand);
      if (this.chain === null) {
        this.chain = asycnChain;
        head.setNextChain(this.chain);
        return;
      }
      this.chain = this.chain.setNextChain(asycnChain);
      // this.chain = this.chain.setNextChain(new Chain(asyncCommand));
    },

    execute: function () {
      head.execute(arguments);
    },
  };
};

const fetchApi1Command = function (params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataAfterApi1 = {
        api1Data: {
          TI10: 1000000,
        },
      };
      params.dataAfterApi1 = dataAfterApi1;
      resolve(this.next(params));
    }, 1000);
  });
};

const fetchApi2Command = function (params) {
  console.log('params2', params);
  return new Promise((resolve) => {
    resolve(200);
  });
};
{
  const macroAsyncCommand = new MacroAsyncCommand();
  macroAsyncCommand.add(fetchApi1Command);
  macroAsyncCommand.add(fetchApi2Command);

  let data = { name: 'Ghan', age: 27, sex: 'man' };
  macroAsyncCommand.execute(data);
}
