/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Map();

  function traverse(target) {
    if (target < 0) {
      return -1;
    }

    if (target === 0) {
      return 0;
    }

    if (dp.has(target)) {
      return dp.get(target);
    }

    let result = Infinity;

    for (let coin of coins) {
      const subSolution = traverse(target - coin);

      if (subSolution === -1) {
        continue;
      }

      const currentSolution = subSolution + 1;
      result = Math.min(result, currentSolution);
    }

    dp.set(target, result !== Infinity ? result : -1);

    return result !== Infinity ? result : -1;
  }

  return traverse(amount);
};
// @lc code=end
