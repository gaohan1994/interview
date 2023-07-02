/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */

var invertTree = function (root) {
  function traverse(node) {
    if (node === null) {
      return null;
    }

    const left = traverse(node.left);

    const right = traverse(node.right);

    const tree = new TreeNode(node.val, right, left);

    return tree;
  }

  const result = traverse(root);

  return result;
};

// var invertTree = function (root) {
//   function traverse(node) {
//     if (node === null) {
//       return;
//     }

//     traverse(node.left);

//     traverse(node.right);

//     const temp = node.left;

//     node.left = node.right;

//     node.right = temp;
//   }

//   traverse(root);

//   return root;
// };
// @lc code=end
