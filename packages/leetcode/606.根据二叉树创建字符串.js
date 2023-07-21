/*
 * @lc app=leetcode.cn id=606 lang=javascript
 *
 * [606] 根据二叉树创建字符串
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
 * @return {string}
 */
var tree2str = function (root) {
  function traverse(node) {
    if (node === null) {
      return "";
    }

    const left = traverse(node.left);

    const right = traverse(node.right);

    if (node.left === null && node.right === null) {
      return `${node.val}`;
    }

    if (node.right === null) {
      return `${node.val}(${left})`;
    }

    return `${node.val}(${left})(${right})`;
  }

  const result = traverse(root);
  return result;
};
// @lc code=end
