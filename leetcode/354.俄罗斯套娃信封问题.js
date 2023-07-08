/*
 * @lc app=leetcode.cn id=354 lang=javascript
 *
 * [354] 俄罗斯套娃信封问题
 */

// @lc code=start
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  // 第一步先对信封进行排序

  envelopes.sort((envelopeA, envelopeB) => {
    const widthDiff = envelopeA[0] - envelopeB[0];

    if (widthDiff === 0) {
      return envelopeB[1] - envelopeA[1];
    }

    return widthDiff;
  });

  let result = 1;
  const box = new Array(envelopes.length).fill(1);

  for (let index = 0; index < envelopes.length; index++) {
    for (let j = 0; j < index; j++) {
      if (envelopes[index][1] > envelopes[j][1]) {
        box[index] = Math.max(box[index], box[j] + 1);
        result = Math.max(result, box[index]);
      }
    }
  }

  return result;
};
// @lc code=end
