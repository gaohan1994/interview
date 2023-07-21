/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
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

// var findMode = function (root) {
//   let result = [];

//   function traverse(node, map = new Map()) {
//     if (node === null) {
//       return;
//     }

//     const nodeSums = (map.get(node.val) ?? 0) + 1;
//     map.set(node.val, nodeSums);

//     traverse(node.left, map);

//     traverse(node.right, map);

//     if (result.length === 0) {
//       result.push(node);
//     } else {
//       const previousMaxNode = result[0];
//       const previousMaxSum = map.get(previousMaxNode);

//       if (nodeSums > previousMaxSum) {
//         result = [node];
//       } else if (nodeSums === previousMaxSum) {
//         result.push(node);
//       }
//     }
//   }

//   traverse(root);
//   console.log("result", result);
//   return result;
// };

var findMode = function (root) {
  const map = new Map();

  function traverse(node) {
    if (node === null) {
      return;
    }

    traverse(node.left);

    traverse(node.right);

    const nodeSums = (map.get(node.val) ?? 0) + 1;

    map.set(node.val, nodeSums);
  }

  traverse(root);

  let result = [];

  Array.from(map).map(([node, sum]) => {
    if (result.length === 0) {
      result.push(node);
    } else {
      if (sum > map.get(result[0])) {
        result = [node];
      } else if (sum === map.get(result[0])) {
        result.push(node);
      }
    }
  });

  return result;
};
// @lc code=end
