/*
 * @lc app=leetcode.cn id=1005 lang=javascript
 *
 * [1005] K 次取反后最大化的数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
  /**
   * 第一次贪心，将 nums 中绝对值高的负数变为正数
   *
   * 如果结束后 K > 0 说明当前所有数都 > 0
   *
   * 第二次贪心，将 nums 中 k 个较小数变为负数
   */

  nums.sort((a, b) => Math.abs(b) - Math.abs(a));

  for (let index = 0; index < nums.length; index++) {
    if (k === 0) break;

    const num = nums[index];

    if (num < 0) {
      k--;
      nums[index] = -nums[index];
    }
  }

  while (k > 0) {
    const minNumIndex = nums.length - 1;
    nums[minNumIndex] = -nums[minNumIndex];
    k--;
  }

  return nums.reduce((previous, item) => previous + item, 0);
};

// @lc code=end
