{
  // 请实现一个 add 函数，满足以下功能。
  add(1); //1
  add(1)(2); // 3
  add(1)(2)(3); // 6
  add(1)(2, 3); // 6
  add(1, 2)(3); // 6
  add(1, 2, 3); // 6
  function add(...rest) {
    let args = [...rest];

    function addExecuter(...executerRest) {
      args.push(...executerRest);
      return add.call(this, ...args);
    }

    addExecuter.toString = function () {
      return args.reduce((acc, item) => acc + item, 0);
    };

    return addExecuter;
  }
}
