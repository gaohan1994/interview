/*
 * @lc app=leetcode.cn id=783 lang=javascript
 *
 * [783] 二叉搜索树节点最小距离
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
var minDiffInBST = function (root) {
  let result = Infinity,
    previous = undefined;

  function traverse(node) {
    if (node === null) {
      return;
    }

    traverse(node.left);

    if (previous === undefined) {
      previous = node;
    } else {
      result = Math.min(result, Math.abs(node.val - previous.val));
      previous = node;
    }

    traverse(node.right);
  }

  traverse(root);

  return result;
};
// @lc code=end
