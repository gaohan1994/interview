/*
 * @lc app=leetcode.cn id=832 lang=javascript
 *
 * [832] 翻转图像
 */

// @lc code=start
/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function (image) {
  function revertRow(array) {
    const result = [];

    for (let index = array.length - 1; index >= 0; index--) {
      const node = array[index];
      result.push(node);
    }

    return result;
  }

  function invertRow(array) {
    const result = [];

    for (let index = 0; index < array.length; index++) {
      const node = array[index];
      result[index] = node === 1 ? 0 : 1;
    }

    return result;
  }

  return image.map(revertRow).map(invertRow);
};
// @lc code=end
