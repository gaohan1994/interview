/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (s === "") {
    return s;
  }

  let stack = [];
  let result = 0;
  let index = 0;
  while (index < s.length) {
    const char = s.charAt(index);
    index++;

    if (char === ")") {
      if (stack.length === 0) {
        continue;
      }
    } else {
      stack.push(char);
    }

    console.log("stack", stack);
  }

  return result;
};
// @lc code=end
