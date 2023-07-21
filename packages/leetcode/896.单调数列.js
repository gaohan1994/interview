/*
 * @lc app=leetcode.cn id=896 lang=javascript
 *
 * [896] 单调数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

var isMonotonic = function (nums) {
  if (nums.length === 1) {
    return true;
  }

  let passtive = true,
    nagetive = true;

  for (let index = 0; index < nums.length - 1; index++) {
    const nextIndex = index + 1;
    const num = nums[index];
    const nextNum = nums[nextIndex];

    if (num > nextNum) {
      passtive = false;
    }

    if (num < nextNum) {
      nagetive = false;
    }
  }

  return passtive || nagetive;
};
// var isMonotonic = function (nums) {
//   if (nums.length === 1) {
//     return true;
//   }

//   function isPasstiveMonotonic(array) {
//     let result = true;

//     for (let index = array.length - 1; index > 0; index--) {
//       const previousIndex = index - 1;
//       const node = array[index];
//       const previousNode = array[previousIndex];

//       if (previousNode > node) {
//         result = false;
//         break;
//       }
//     }

//     return result;
//   }

//   function isNagetiveMonotonic(array) {
//     let result = true;

//     for (let index = array.length - 1; index > 0; index--) {
//       const previousIndex = index - 1;
//       const node = array[index];
//       const previousNode = array[previousIndex];
//       if (previousNode < node) {
//         result = false;
//         break;
//       }
//     }

//     return result;
//   }

//   return isPasstiveMonotonic(nums) || isNagetiveMonotonic(nums);
// };
// @lc code=end
