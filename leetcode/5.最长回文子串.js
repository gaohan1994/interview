/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const dp = new Map();

  if (s.length <= 1) {
    return s;
  }

  let length = 2;

  while (length < s.length) {
    // 从长度为2开始遍历
    // 0-2, 1-3, 2-4 ...
    let start = 0;

    while (start + length < s.length) {
      const end = start + length;
      const char = s.slice(start, end);
    }

    length++;
  }
};
// @lc code=end
