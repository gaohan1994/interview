/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let left = 0;
  let right = 0;

  while (left < s.length && right < t.length) {
    const charS = s.charAt(left);
    const charT = t.charAt(right);

    if (charS === charT) {
      left++;
    }

    right++;
  }

  return left === s.length;
};
// @lc code=end
