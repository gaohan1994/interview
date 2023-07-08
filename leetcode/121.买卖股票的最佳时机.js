/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let result = 0;

  for (let index = 1; index < prices.length; index++) {
    const salePrice = prices[index];
    for (let j = 0; j < index; j++) {
      const buyPrice = prices[j];

      if (salePrice > buyPrice) {
        result = Math.max(result, salePrice - buyPrice);
      }
    }
  }

  return result;
};
// @lc code=end
