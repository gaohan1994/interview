{
  // 某公司 1 到 12 月份的销售额存在一个对象里面
  // 如下：{1:222, 2:123, 5:888}
  // 请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

  function resultHandler(sales = {}) {
    let result = new Array(12).fill(null);

    Object.keys(sales).map(month => {
      if (sales.hasOwnProperty(month)) {
        result[month - 1] = sales[month];
      }
    });

    return result;
  }

  // resultHandler({ 1: 222, 2: 123, 5: 888 });
}

{
  // https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/113
  // 随机生成一个长度为 10 的整数类型的数组，
  // 例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，
  // 将其排列成一个新数组，要求新数组形式如下，
  // 例如 [[2, 3, 4, 5], [10, 11], [20]]。

  // 生成随机数组
  function generateRandomArray(arrayLength = 10) {
    return new Array(arrayLength).fill(null).map(_ => Math.floor(Math.random() * 100));
  }

  function arrayHandler() {
    // 生成随机数组之后对其进行排序，得到升序数组
    const array = generateRandomArray().sort((a, b) => a - b);
    const result = new Array(10).fill([]);

    let index = 9;
    while (index > 0) {
      // 基数 90、80、70...
      const base = index * 10;
      let begin = 0;

      // 找到第一个大于等于基数的值，[begin, array.length - 1] 均是大于等于 基数的值
      while (begin < array.length) {
        const node = array[begin];

        if (node >= base) {
          // 找到了第一个大于等于 base 的值
          // 这里要修改原数组
          result[index] = array.splice(begin);
        } else {
          // 没找到继续找
          begin++;
        }
      }

      index--;
    }

    // 最后处理一下空数据
    return result.filter(item => item.length !== 0);
  }

  const result = arrayHandler();
  console.log("result", result);
}
