/*
 * @lc app=leetcode.cn id=671 lang=javascript
 *
 * [671] 二叉树中第二小的节点
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
var findSecondMinimumValue = function (root) {
  if (root === null) {
    return -1;
  }

  let result = new Set();

  function traverse(node) {
    if (node === null) {
      return;
    }

    traverse(node.left);

    result.add(node.val);

    traverse(node.right);
  }
  traverse(root);

  console.log("result", result);

  return Array.from(result).sort((a, b) => a - b)[1] ?? -1;
};
// @lc code=end
