/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const [m, n] = [word1.length, word2.length];
  const dp = new Array(m + 1).fill(Infinity).map(() => new Array(n + 1).fill(Infinity));

  for (let index = 0; index < dp.length; index++) {
    dp[index][0] = index;
  }

  for (let index = 0; index < dp[0].length; index++) {
    dp[0][index] = index;
  }

  for (let i = 1; i <= m; i++) {
    const char1 = word1[i - 1];

    for (let j = 1; j <= n; j++) {
      const char2 = word2[j - 1];

      if (char1 === char2) {
        // 如果相等则跳过不动不操作
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
      }
    }
  }

  // console.log("dp", dp);

  return dp[m][n];
};
// @lc code=end
