/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (node) {
  if (node === null) {
    return 0;
  }

  if (node.left === null && node.right === null) {
    return 1;
  }

  let leftHeight = minDepth(node.left);
  let rightHeight = minDepth(node.right);

  if (leftHeight === 0) {
    return rightHeight + 1;
  }

  if (rightHeight === 0) {
    return leftHeight + 1;
  }

  return Math.min(leftHeight, rightHeight) + 1;
};
// @lc code=end
