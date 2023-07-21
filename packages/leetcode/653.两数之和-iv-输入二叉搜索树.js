/*
 * @lc app=leetcode.cn id=653 lang=javascript
 *
 * [653] 两数之和 IV - 输入二叉搜索树
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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  let set = new Set();
  let result = false;
  function traverse(node) {
    if (node === null) {
      return;
    }

    if (set.has(k - node.val)) {
      return (result = true);
    }

    set.add(node.val);

    traverse(node.left);

    traverse(node.right);
  }

  traverse(root);

  return result;
};
// @lc code=end
