import React from 'react';
import EventEmiter, {
  createPromiseList,
  pipe,
  PromiseLiner,
} from '../component/event';
import { useEffect } from 'react';

Function.prototype.before = function (beforeCallback) {
  let self = this;
  return function () {
    beforeCallback.apply(this, arguments);
    return self.apply(this, arguments);
  };
};

Function.prototype.after = function (afterCallback) {
  let self = this;

  return function () {
    let ret = self.apply(this, arguments);
    afterCallback.apply(this, arguments);
    return ret;
  };
};

// Function.prototype.

const handleCallback = (...rest) => {
  console.log('handle callback');
};

const emitter = new EventEmiter();

emitter.emit = emitter.emit.after(() => {
  console.log('this is after');
});

emitter.on('handle', handleCallback);

export default function TestPage() {
  const emitFunction = () => {
    emitter.emit('handle', 'ghan');
  };

  const beforeEmit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('before');
        resolve();
      }, 2000);
    });
  };

  const afterEmit = (num) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('after emit', num);
        resolve();
      }, 1000);
    });
  };

  const onEmit = () => {
    // const list = [emitFunction, afterEmit];
    // createPromiseList(list).then((result) => {
    //   console.log('result', result);
    // });
    // const handle = createPromiseList([emitFunction, afterEmit]);
    // handle.then((res) => {
    //   console.log('res');
    // });

    emitFunction();
  };

  const onLiner = () => {
    const promiseL = new PromiseLiner();
    promiseL
      .add(beforeEmit)
      .add(afterEmit)
      .add(() => afterEmit(4))
      .run()
      .then((res) => {
        console.log('res');
      });
  };

  return (
    <div>
      asd
      <button onClick={onEmit}>click</button>
      <button onClick={onLiner}>liner</button>
    </div>
  );
}
