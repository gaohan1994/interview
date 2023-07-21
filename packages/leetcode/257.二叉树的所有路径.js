/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */

var binaryTreePaths = function (root) {
  const result = [];

  if (root === null) {
    return result;
  }

  const quene = [root, ""];

  while (quene.length > 0) {
    const node = quene.shift();
    const path = quene.shift();

    if (node.left === null && node.right === null) {
      result.push(path + `${node.val}`);
    }

    if (node.left !== null) {
      quene.push(node.left);
      quene.push(path + `${node.val}->`);
    }

    if (node.right !== null) {
      quene.push(node.right);
      quene.push(path + `${node.val}->`);
    }
  }

  return result;
};

// var binaryTreePaths = function (root) {
//   const result = [];

//   function traverse(node, treePath = "") {
//     if (node === null) {
//       return;
//     }

//     if (node.left === null && node.right === null) {
//       result.push(treePath + `${node.val}`);
//     }

//     traverse(node.left, treePath + `${node.val}->`);

//     traverse(node.right, treePath + `${node.val}->`);
//   }

//   traverse(root);

//   return result;
// };
// @lc code=end
