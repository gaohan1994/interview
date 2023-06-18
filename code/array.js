

function flat (arr, depth = 1) {

  if (depth > 0) {
    return arr.reduce((previousArr, item) =>
      previousArr.concat(Array.isArray(item) ? flat(arr, depth - 1) : item), []);
  }

  return arr.slice();
}

{

  Array.prototype.myReduce = function myReduce (executer, initializeValue) {
    let context = this, accResult = initializeValue || context[0];

    for (let index = 0; index < context.length; index++) {
      const item = context[index];
      accResult = executer( executer, item, index, context )
    }

    return accResult;
  }

  // 手写 reduce
  function reduce (array, executer) {
    let accResult = undefined;

    for (let index = 0; index < array.length; index++) {
      const item = array[index];
      accResult = executer(
        accResult,
        item,
        array
      );
    }

    return accResult;
  }

  function test () {
    reduce([1, 2, 3], (previousValue, item, this) => {

    });
  }
}

{
  // 去重

  function unique (arr) {
    if (!Array.isArray(arr)) return arr;

    return [...new Set(arr)]
  }
}

{
  // 去重

  function unique (arr) {
    if (!Array.isArray(arr)) return arr;

    return arr.filter((item, index, array) => {
      return array.indexOf(item) === index;
    })
  }
}