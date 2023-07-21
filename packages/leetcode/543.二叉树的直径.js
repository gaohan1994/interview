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
  let result = 0;

  function traverse(node) {
    if (node === null) {
      return 0;
    }

    const leftDiameter = traverse(node.left);

    const rightDiameter = traverse(node.right);

    const currentMaxDiameter = Math.max(leftDiameter, rightDiameter);

    result = Math.max(result, leftDiameter + rightDiameter);

    return currentMaxDiameter + 1;
  }

  traverse(root);

  return result;
};
// @lc code=end
