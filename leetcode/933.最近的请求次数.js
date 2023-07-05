/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start

class RecentCounter {
  constructor() {
    this.quene = [];
  }

  ping = time => {
    const minTime = time - 3000;
    this.quene.push(time);
    this.quene = this.quene.filter(item => item >= minTime);
    return this.quene.length;
  };
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end
