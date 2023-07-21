/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  let result = 1;

  for (let index = 0; index < nums.length; index++) {
    for (let j = 0; j < index; j++) {
      if (nums[index] > nums[j]) {
        const currentNumberLength = dp[j] + 1;
        dp[index] = Math.max(dp[index], currentNumberLength);
        result = Math.max(result, dp[index]);
      }
    }
  }

  return result;
};
// @lc code=end
