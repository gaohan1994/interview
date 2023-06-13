// u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')
// 实现 u

class U {
  constructor() {
    this.promise = Promise.resolve();
  }

  console(val) {
    this.promise = this.promise.then(() => {
      console.log(val);
    });
    return this;
  }

  setTimeout(delay) {
    this.promise = this.promise.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay);
      });
    });

    return this;
  }
}

var length = 10;
function fn() {
  return this.length + 1;
}
var obj1 = {
  length: 5,
  test1: function () {
    return fn();
  },
};
obj1.test2 = fn;
console.log('obj1.test1.call()', obj1.test1.call()); // 11;
console.log('obj1.test1()', obj1.test1()); // 6; 11
console.log('obj1.test2.call()', obj1.test2.call()); // 12; 11
console.log('obj1.test2()', obj1.test2()); // 6;

// 给数组中的字符串编号，f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']，写完后问了一下时间和空间复杂度。

function indexArray(array) {
  if (array.length === 0) {
    return [];
  }

  function IndexNode(first) {
    this.first = first;
    this.index = 0;
  }

  let result = [];

  /**
   * @key currentString
   * @value {
   *  first: index,
   *  index: 0,
   * }
   * @param map
   */
  let map = new Map();

  for (let i = 0; i < array.length; i++) {
    /**
     * 当前遍历 string
     * @param currentString
     */
    const currentString = array[i];

    if (map.has(currentString)) {
      // 如果已经存在这个字符串
      let node = map.get(currentString);
      const { first, index } = node;
      if (index === 0) {
        // 说明之前是第一次出现要修改第一次出现的节点
        const prevFirstString = result[first];
        const nextIndex = index + 1;
        node.index = nextIndex;
        map.set(currentString, node);

        result[first] = `${prevFirstString}${nextIndex}`;
        result.push(`${currentString}${nextIndex + 1}`);
      } else {
        // >2次出现 index ++ 插入结果中
        node.index++;
        result.push(`${currentString}${node.index}`);
        map.set(currentString, node);
      }
    } else {
      // 如果不存在则插入结果 新建node存入hash
      const node = new IndexNode(i);
      map.set(currentString, node);
      result.push(currentString);
    }
  }

  return result;
}

(function () {
  console.log(indexArray(['ab', 'c', 'd', 'ab', 'c']));
})();
