/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let dp_0 = nums[0],
    dp_1 = 0;
  let result = dp_0;

  for (let index = 1; index < nums.length; index++) {
    dp_1 = Math.max(nums[index], dp_0 + nums[index]);
    dp_0 = dp_1;

    result = result = Math.max(result, dp_0);
  }

  return result;
};
// @lc code=end
