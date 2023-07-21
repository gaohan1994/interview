/*
 * @lc app=leetcode.cn id=617 lang=javascript
 *
 * [617] 合并二叉树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */

var mergeTrees = function (root1, root2) {
  if (root1 === null && root2 === null) {
    return null;
  }
  if (root1 === null) {
    return root2;
  }
  if (root2 === null) {
    return root1;
  }

  const quene = [root1, root2];

  while (quene.length > 0) {
    const node1 = quene.shift();
    const node2 = quene.shift();
    node1.val += node2.val;

    if (node1.left && node2.left) {
      quene.push(node1.left);
      quene.push(node2.left);
    } else if (node1.left === null) {
      node1.left = node2.left;
    }

    if (node1.right && node2.right) {
      quene.push(node1.right);
      quene.push(node2.right);
    } else if (node1.right === null) {
      node1.right = node2.right;
    }
  }

  return root1;
};
// var mergeTrees = function (root1, root2) {
//   function traverse(nodeA, nodeB) {
//     if (nodeA === null && nodeB === null) {
//       return null;
//     } else if (nodeA === null) {
//       return nodeB;
//     } else if (nodeB === null) {
//       return nodeA;
//     }

//     const left = traverse(nodeA.left, nodeB.left);

//     const right = traverse(nodeA.right, nodeB.right);

//     const tree = new TreeNode(nodeA.val + nodeB.val, left, right);

//     return tree;
//   }

//   const result = traverse(root1, root2);
//   return result;
// };
// @lc code=end
