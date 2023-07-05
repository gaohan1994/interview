{
  // 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2]
  // 和 [A, B, C, D]
  // 合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]

  function mergeArray(left, right) {
    const result = [];

    let index = 0;
    while (right.length > 0 && index < left.length) {
      const char = right.shift();

      while (left[index] && left[index].charAt(0) === char) {
        result.push(left[index]);
        index++;
      }

      result.push(char);
    }

    return result;
  }
}
