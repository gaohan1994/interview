// 单例模式

function CreateSingleton(func) {
  let instance;

  return function () {
    if (instance) {
      return instance;
    }

    return func.apply(this, arguments);
  };
}
