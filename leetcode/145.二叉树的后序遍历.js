/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
var postorderTraversal = function (root) {
  function traverse(node) {
    if (node === null) {
      return [];
    }

    const leftResult = traverse(node.left);

    const rightResult = traverse(node.right);

    const result = [];

    if (leftResult) {
      result.push(...leftResult);
    }
    if (rightResult) {
      result.push(...rightResult);
    }

    result.push(node.val);
    return result;
  }

  const result = traverse(root);

  return result;
};
// var postorderTraversal = function (root) {
//   let result = [];

//   function traverse(node) {
//     if (node === null) {
//       return;
//     }

//     traverse(node.left);

//     traverse(node.right);

//     result.push(node.val);
//   }

//   traverse(root);

//   return result;
// };
// @lc code=end
