{
  // 算法题「旋转数组」
  // 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
  //   输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
  // 输出: [5, 6, 7, 1, 2, 3, 4]
  // 解释:
  // 向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
  // 向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
  // 向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

  function handler(array, k) {
    const realK = k > array.length ? k % array.length : k;

    for (let index = 0; index < array.length; index++) {
      const item = array[index];

      if (index < k) {
      }
    }
  }
}
