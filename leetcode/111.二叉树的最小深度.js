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
var minDepth = function (root) {
  function traverse(node) {
    if (node === null) {
      return 0;
    }

    let leftHeight = traverse(node.left);
    let rightHeight = traverse(node.right);

    return Math.min(leftHeight, rightHeight) + 1;
  }
  return traverse(root);
};
// @lc code=end
