/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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

// var maxDepth = function (root) {
//   let result = 0;

//   let depth = 0;

//   function traverse(root) {
//     if (root === null) {
//       return;
//     }

//     depth++;
//     result = Math.max(result, depth);
//     traverse(root.left);
//     traverse(root.right);
//     depth--;
//   }

//   traverse(root);
//   return result;
// };

var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
};
// @lc code=end
