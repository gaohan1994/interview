/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const box = new Array(text1.length + 1).fill(0).map(() => new Array(text2.length + 1).fill(0));

  for (let i = 1; i <= text1.length; i++) {
    const node1 = text1.charAt(i - 1);

    for (let j = 1; j <= text2.length; j++) {
      const node2 = text2.charAt(j - 1);

      if (node1 === node2) {
        box[i][j] = box[i - 1][j - 1] + 1;
      } else {
        box[i][j] = Math.max(box[i - 1][j], box[i][j - 1]);
      }
    }
  }

  return box[text1.length][text2.length];
};
// @lc code=end
