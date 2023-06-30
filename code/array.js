

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


{
  // 用 reduce 实现 map 

  const array = [1, 2, 3];

  Array.prototype.reduceMap = function (executer, thisArg) {
    const context = this;
    return context.reduce((previousValue, currentItem, index) => {
      return previousValue.push(executer.call(thisArg, currentItem, index, context))
    }, []);
  }
}

{
  // 数组去重

  function unique1 (arr) {
    return [...new Set(arr)]
  }

  const unique2 = (arr) => arr.filter((item, index, array) => array.indexOf(item) === index)
}

{
  // 实现lodash中的groupBy(intput,item=>item.className)
  // groupBy([6.1, 4.2, 6.3], Math.floor);
  // => { '4': [4.2], '6': [6.1, 6.3] }
  
  // // The `_.property` iteratee shorthand.
  // groupBy(['one', 'two', 'three'], 'length');
  // => { '3': ['one', 'two'], '5': ['three'] }

  function groupBy (array, executer) {
    const map = new Map();

    for (let index = 0; index < array.length; index++) {
      const item = array[index];

      let groupKey;
      if (typeof executer === 'function') {
        groupKey = executer.apply(null, item)
      } else {
        groupKey = item[executer]
      }

      if (!groupKey) {
        throw new Error('Wrong group executer')
      }

      if (map.has(groupKey)) {
        map.set(groupKey, map.get(groupKey).push(item))
      } else {
        map.set(groupKey, [item])
      }
    }

    return Array.from(map)
  }
}