/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (nums.length <= 1) {
    return nums;
  }

  let box = [];

  let right = 0,
    result = [];

  while (right < nums.length) {
    const node = nums[right];
    right++;

    if (box.length < k) {
      box.push(node);
    }

    if (box.length === k) {
      // find max number and push to result
      // box.shift() && left ++
      let maxNumber = box[0];

      for (let i = 0; i < box.length; i++) {
        maxNumber = Math.max(maxNumber, box[i]);
      }

      result.push(maxNumber);
      box.shift();
    }
  }

  // console.log("box", box);

  return result;
};
// @lc code=end
