/*
 * @lc app=leetcode.cn id=771 lang=javascript
 *
 * [771] 宝石与石头
 */

// @lc code=start
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  const set = new Set();
  let result = 0;

  for (let index = 0; index < jewels.length; index++) {
    const jewel = jewels.charAt(index);
    set.add(jewel);
  }

  for (let index = 0; index < stones.length; index++) {
    const stone = stones.charAt(index);
    if (set.has(stone)) {
      result += 1;
    }
  }

  return result;
};
// @lc code=end
