/*
 * @lc app=leetcode.cn id=1021 lang=javascript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  let stack = [];
  let result = "";

  for (let index = 0; index < s.length; index++) {
    const char = s.charAt(index);

    if (char === ")") {
      stack.pop();
    }

    if (stack.length) {
      result += char;
    }

    if (char === "(") {
      // 入栈
      stack.push(char);
    }
  }

  return result;
};
// @lc code=end
