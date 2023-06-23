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
