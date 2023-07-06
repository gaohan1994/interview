{
  /**
   * 实现冒泡排序
   * @param {*} array
   *
   * 什么是 冒泡排序？
   *
   * 两两比对，如果第一个比第二个大则交换我位置一直比对到最后一对数据
   * 重复执行，直到没有任何一对数字需要比较
   */
  function bubbleSort(array) {
    for (let index = 0; index < array.length; index++) {
      for (let j = 0; j < array.length - 1 - j; j++) {
        if (array[index] > array[j]) {
          const temp = array[j];
          array[j] = array[index];
          array[index] = temp;
        }
      }
    }

    return array;
  }

  // 改进冒泡排序
  function bubbleSort(array) {
    let index = array.length - 1;

    while (index > 0) {
      let position = 0;

      for (let j = 0; j < index; j++) {
        if (array[j] > array[j + 1]) {
          position = j;

          const temp = array[j];
          array[j] = array[index];
          array[index] = temp;
        }
      }

      index = position;
    }

    return array;
  }
}
