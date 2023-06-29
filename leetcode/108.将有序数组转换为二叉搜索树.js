/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  return traverse(nums);
};

function traverse(nums) {
  if (nums.length === 0) {
    return null;
  }

  let index = nums.length >>> 1;
  let leftTree = traverse(nums.slice(0, index));

  let rightTree = traverse(nums.slice(index + 1, nums.length));

  let tree = new TreeNode(nums[index], leftTree, rightTree);

  return tree;
}
// @lc code=end
