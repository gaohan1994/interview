/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let dp = new Map();
  dp.set(1, 1);
  dp.set(2, 2);

  for (let index = 3; index <= n; index++) {
    dp.set(index, dp.get(index - 2) + dp.get(index - 1));
  }

  return dp.get(n);
};
// @lc code=end
