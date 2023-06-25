/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
var diameterOfBinaryTree = function (root) {
  let depth = 0;

  function calculateDepth(node) {
    if (node === null) {
      return 0;
    }

    const leftDepth = calculateDepth(node.left);
    const rightDepth = calculateDepth(node.right);

    const currentDepth = Math.max(leftDepth, rightDepth);
    depth = Math.max(depth, currentDepth);
    return 1 + currentDepth;
  }
  calculateDepth(root);
  return depth;
};
// @lc code=end
