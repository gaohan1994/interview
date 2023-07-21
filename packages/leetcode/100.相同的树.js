/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

var isSameTree = function (p, q) {
  if (p === null && q === null) {
    return true;
  } else if (p === null || q === null) {
    return false;
  } else {
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
};
// var isSameTree = function (p, q) {
//   let queneP = [p];
//   let queneQ = [q];

//   while (queneP.length > 0) {
//     if (queneQ.length !== queneP.length) {
//       return false;
//     }

//     const pNode = queneP.shift();
//     const qNode = queneQ.shift();

//     if (pNode !== null && qNode !== null) {
//       if (pNode.val !== qNode.val) {
//         return false;
//       } else {
//         queneP.push(pNode.left);
//         queneP.push(pNode.right);

//         queneQ.push(qNode.left);
//         queneQ.push(qNode.right);
//       }
//     }

//     if (pNode !== null && qNode === null) {
//       return false;
//     }

//     if (pNode === null && qNode !== null) {
//       return false;
//     }
//   }

//   return true;
// };
// @lc code=end
