{
  // 已知如下数组：
  // var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
  // 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

  function flatten(array, map = new Map()) {
    const result = [];

    return result;
  }
}

{
  // 使用迭代的方式实现 flatten 函数。

  function flatten(array) {
    const result = [];

    const quene = [array];

    while (quene.length > 0) {
      const node = quene.shift();

      if (Array.isArray(node)) {
        quene.unshift(...node);
      } else {
        result.push(node);
      }
    }

    return result;
  }

  const result = flatten([1, [2, 3], 4, [[5]]]);
  console.log("result", result);
}
