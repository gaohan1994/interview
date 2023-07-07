/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

var fib = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  const dp = new Map();
  dp.set(0, 0);
  dp.set(1, 1);

  for (let index = 2; index <= n; index++) {
    dp.set(index, dp.get(index - 2) + dp.get(index - 1));
  }

  return dp.get(n);
};

// var fib = function (n) {
//   return traverse(n);
// };

function traverse(num, dp = new Map()) {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }

  if (dp.has(num)) {
    return dp.get(num);
  }
  const result = traverse(num - 2, dp) + traverse(num - 1, dp);
  dp.set(num, result);
  return result;
}

// var fib = function (n) {
//   if (n === 0) {
//     return 0;
//   }

//   if (n === 1) {
//     return 1;
//   }

//   return fib(n - 2) + fib(n - 1);
// };
// @lc code=end
