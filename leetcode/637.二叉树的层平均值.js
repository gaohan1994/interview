/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  if (root === null) {
    return [];
  }
  const result = [];
  const quene = [root];

  while (quene.length > 0) {
    const length = quene.length;
    let index = quene.length;
    let sum = 0;
    while (index > 0) {
      const node = quene.shift();

      if (node !== null) {
        sum += node.val;
        node.left && quene.push(node.left);
        node.right && quene.push(node.right);
      }

      if (index === 1) {
        result.push(sum / length);
        sum = 0;
      }

      index--;
    }
  }
  return result;
};
// @lc code=end
