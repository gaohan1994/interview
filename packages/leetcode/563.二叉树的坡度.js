/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
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
var findTilt = function (root) {
  let result = [];

  function traverse(node) {
    if (node === null) {
      return 0;
    }

    if (node.left === null && node.right === null) {
      // is leaf
      return node.val;
    }

    const left = traverse(node.left);

    const right = traverse(node.right);

    const tilt = Math.abs(left - right);
    result.push(tilt);

    return left + right + node.val;
  }

  traverse(root);

  return result.reduce((previous, item) => previous + item, 0);
};

// @lc code=end
