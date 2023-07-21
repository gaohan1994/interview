/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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

var preorderTraversal = function (root) {
  function traverse(node) {
    if (node === null) {
      return [];
    }

    let leftResult = traverse(node.left);

    let rightResult = traverse(node.right);

    let result = [];

    result.push(node.val);
    if (leftResult) {
      result.push(...leftResult);
    }
    if (rightResult) {
      result.push(...rightResult);
    }

    return result;
  }

  const result = traverse(root);

  return result;
};
// var preorderTraversal = function (root) {
//   let result = [];

//   function traverse(node) {
//     if (node === null) {
//       return;
//     }

//     result.push(node.val);

//     traverse(node.left);

//     traverse(node.right);
//   }

//   traverse(root);

//   return result;
// };
// @lc code=end
