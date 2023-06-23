/**
 * 参考 labudadong
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485141&idx=1&sn=0e4583ad935e76e9a3f6793792e60734&scene=21#wechat_redirect
 */

function slidingWindow(s, t) {
  const need = new Map();
  const window = new Map();

  for (let c in t) {
    need.set(c, (need.get(c) ?? 0) + 1);
  }

  let left = 0,
    right = 0,
    valid = 0;

  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s[right];

    // 右移窗口
    right++;

    // 进行窗口内数据的一系列更新
    // ...

    console.log(`window: left: ${left}, right: ${right}`);

    let windowNeedsShrink = false;
    while (windowNeedsShrink) {
      // d 是将移出窗口的字符
      const d = s[left];

      // 左移窗口
      left++;

      // 进行窗口内数据的一系列更新
      // ...
    }
  }
}

{
  // 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
  // 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

  /**
   * @param {string} s
   * @param {string} t
   * @return {string}
   */
  var minWindow = function (s, t) {
    const need = new Map();
    const box = new Map();

    // 第一步初始化所有需要的字符
    for (let char of t) {
      need.set(char, (need.get(char) ?? 0) + 1);
    }

    let left = 0,
      right = 0,
      valid = 0,
      start = 0,
      length = Infinity;

    while (right < s.length) {
      //  char 是将要加入插入的字符
      const char = s[right];
      right++;

      if (need.get(char)) {
        box.set(char, (box.get(char) ?? 0) + 1);

        if (need.get(char) === box.get(char)) {
          valid += 1;
        }
      }

      console.log(`window: left: ${left}, right: ${right}, valid: ${valid}`);

      // 判断是否应该收缩
      while (valid === need.size) {
        if (right - left < length) {
          start = left;
          length = right - left;
        }

        console.log(`start: ${start}, legnth: ${length}`);

        const deleteChar = s[left];
        left++;

        if (need.get(deleteChar)) {
          if (box.get(deleteChar) === need.get(deleteChar)) {
            valid--;
          }
          box.set(deleteChar, box.get(deleteChar) - 1);
        }
      }
    }

    return length === Infinity ? "" : s.slice(start, start + length);
  };

  const str = minWindow("ADOBECODEBANC", "ABC");
  console.log("str", str);
}

{
  // https://leetcode.cn/problems/permutation-in-string/
  // 567 题
  // 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。
  // 如果是，返回 true ；否则，返回 false 。
  // 换句话说，s1 的排列之一是 s2 的 子串 。

  /**
   * @param {string} s1
   * @param {string} s2
   * @return {boolean}
   */
  var checkInclusion = function (s1, s2) {
    let need = new Map();
    let box = new Map();

    for (let c of s1) {
      need.set(c, (need.get(c) ?? 0) + 1);
    }

    let left = 0,
      right = 0,
      valid = 0;
    // length = Infinity;

    while (right < s2.length) {
      const char = s2[right];
      right++;

      console.log(`left: ${left}, right: ${right}`);

      if (need.has(char)) {
        box.set(char, (box.get(char) ?? 0) + 1);

        if (need.get(char) === box.get(char)) {
          valid++;
        }
      }

      while (valid === need.size) {
        // 缩小窗口

        if (right - left === s1.length) {
          // 如果窗口内的字符串刚好等于子串长度则说明包含子串
          return true;
        }

        const deleteChar = s2[left];
        left++;

        if (need.has(deleteChar)) {
          if (box.get(deleteChar) === need.get(deleteChar)) {
            valid--;
          }
          box.set(deleteChar, (box.get(deleteChar) ?? 0) - 1);
        }
      }
    }

    return false;
  };
}

{
  // 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。
  // 不考虑答案输出的顺序。
  // 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
  // 来源：力扣（LeetCode） 438 题
  // 链接：https://leetcode.cn/problems/find-all-anagrams-in-a-string

  // 输入: s = "cbaebabacd", p = "abc"
  // 输出: [0,6]
  // 解释:
  // 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
  // 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

  //   输入: s = "abab", p = "ab"
  // 输出: [0,1,2]
  // 解释:
  // 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
  // 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
  // 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。

  var findAnagrams = function (s, p) {
    const need = new Map();
    const box = new Map();

    for (let c of p) {
      need.set(c, (need.get(c) ?? 0) + 1);
    }

    let left = 0,
      right = 0,
      valid = 0,
      result = [];

    while (right < s.length) {
      const char = s[right];
      right++;

      if (need.has(char)) {
        box.set(char, (box.get(char) ?? 0) + 1);

        if (need.get(char) === box.get(char)) {
          valid++;
        }
      }

      while (valid === need.size) {
        if (right - left === p.length) {
          result.push(left);
        }

        const deleteChar = s[left];
        left++;

        if (need.has(deleteChar)) {
          if (box.get(deleteChar) === need.get(deleteChar)) {
            valid--;
          }

          box.set(deleteChar, (box.get(deleteChar) ?? 0) - 1);
        }
      }
    }

    return result;
  };
}
