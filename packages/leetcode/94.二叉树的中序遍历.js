/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
// var inorderTraversal = function (root) {
//   let result = [];

//   function traverse(node) {
//     if (node === null) {
//       return;
//     }

//     traverse(node.left);

//     result.push(node.val);

//     traverse(node.right);
//   }

//   traverse(root);

//   return result;
// };

var inorderTraversal = function (root) {
  function traverse(node) {
    if (node === null) {
      return [];
    }

    const leftResult = traverse(node.left);

    const rightResult = traverse(node.right);

    let result = [];

    if (leftResult) {
      result.push(...leftResult);
    }
    result.push(node.val);
    if (rightResult) {
      result.push(...rightResult);
    }

    return result;
  }

  return traverse(root);
};
// @lc code=end
