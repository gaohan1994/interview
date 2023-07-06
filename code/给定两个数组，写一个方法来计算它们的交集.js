{
  // 给定两个数组，写一个方法来计算它们的交集。
  // 给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

  function intersection(array1, array2) {
    /**
     * 创建 need 遍历第一个数组生成需要对比的数据和数量
     * 创建 box 为交集
     */
    const need = new Map();
    const box = new Map();

    array1.forEach(item => {
      need.set(item, (need.get(item) ?? 0) + 1);
    });

    for (let index = 0; index < array2.length; index++) {
      const item = array2[index];

      /**
       * 遍历第二个数组
       * 如果当前元素出现在第一个数组中 && 并且已有交集中的元素数量小于第一个数组中的数量
       * 则向交集中插入当前元素 数量为之前元素数量 + 1 如果之前没有则置为1
       */
      if (need.has(item) && need.get(item) > (box.get(item) ?? 0)) {
        box.set(item, (box.get(item) ?? 0) + 1);
      }
    }

    const result = [];

    box.forEach((itemQuantity, item) => {
      result.push(...new Array(itemQuantity).fill(item));
    });

    return result;
  }

  intersection([1, 2, 2, 1], [2, 2]);
}
