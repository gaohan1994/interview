{
  // 周一算法题之「移动零」
  // 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
  //   说明:
  // 必须在原数组上操作，不能拷贝额外的数组。
  // 尽量减少操作次数。
  //   输入: [0,1,0,3,12]
  // 输出: [1,3,12,0,0]

  function moveZero(array) {
    let left = 0;
    let right = 0;

    while (right < array.length) {
      if (array[left] !== 0) {
        left++;
      } else if (array[right] !== 0) {
        array[left] = array[right];
        array[right] = 0;
        left++;
      }

      right++;
    }

    return array;
  }

  console.log(moveZero([0, 1, 2, 0, 3, 4, 0, 5]));
}
