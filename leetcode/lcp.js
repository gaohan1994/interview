/**
 * 小朋友 A 在和 ta 的小伙伴们玩传信息游戏，游戏规则如下：
有 n 名玩家，所有玩家编号分别为 0 ～ n-1，其中小朋友 A 的编号为 0
每个玩家都有固定的若干个可传信息的其他玩家（也可能没有）。传信息的关系是单向的（比如 A 可以向 B 传信息，但 B 不能向 A 传信息）。
每轮信息必须需要传递给另一个人，且信息可重复经过同一个人
给定总玩家数 n，以及按 [玩家编号,对应可传递玩家编号] 关系组成的二维数组 relation。返回信息从小 A (编号 0 ) 经过 k 轮传递到编号为 n-1 的小伙伴处的方案数；若不能到达，返回 0。

输入：n = 5, relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]], k = 3
输出：3
解释：信息从小 A 编号 0 处开始，经 3 轮传递，到达编号 4。共有 3 种方案，分别是 0->2->0->4， 0->2->1->4， 0->2->3->4。
 * @param {number} n
 * @param {number[][]} relation
 * @param {number} k
 * @return {number}
 */

{
  // 暴力解法

  var numWays1 = function (n, relation, k) {
    // 初始化 step
    let step = new Array(k).fill(undefined).map((_) => []);
    for (let i = 0, item; (item = relation[i++]); ) {
      if (item[0] === 0) {
        step[0].push(item);
      }
    }

    let index = 1;
    while (index < k) {
      // 上一次传递的所有步骤
      const prevSteps = step[index - 1];

      // 遍历上一次传递的步骤，所有上一次步骤的结束值都是这次传递的开始值，寻找对应步骤
      for (const [prevStartNum, prevEndNum] of prevSteps) {
        for (let i = 0, item; (item = relation[i++]); ) {
          if (item[0] === prevEndNum) {
            step[index].push(item);
          }
        }
      }
      index++;
    }

    const target = n - 1;
    let result = 0;
    for (let i = 0; i < step[k - 1].length; i++) {
      if (step[k - 1][i][1] === target) {
        result++;
      }
    }
    return result;
  };

  // 第k轮能到 [x, n-1] => k-1轮能到 [a, x] => k - 2轮能到 [b, a];
  var numWays1 = function (n, relation, k) {
    // numWays1(x, relation, k - 1);

    function dp(target) {}
  };

  // numWays(
  //   5,
  //   [
  //     [0, 2],
  //     [2, 1],
  //     [3, 4],
  //     [2, 3],
  //     [1, 4],
  //     [2, 0],
  //     [0, 4],
  //   ],
  //   3
  // );
}

{
  /**
   * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
   *
   * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
   * 输出：6
   * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
   *
   * @param {number[]} nums
   * @return {number}
   */
  var maxSubArray = function (nums) {
    if (!nums) {
      return null;
    }
    let dp = [];
    dp[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      if (dp[i - 1] < 0) {
        dp[i] = nums[i];
      } else {
        dp[i] = dp[i - 1] + nums[i];
      }
    }
  };

  maxSubArray([4, -1, 2, 1, -5, 4]);
}
