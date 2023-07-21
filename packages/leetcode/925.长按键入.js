/*
 * @lc app=leetcode.cn id=925 lang=javascript
 *
 * [925] 长按键入
 */

// @lc code=start
/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function (name, typed) {
  const n = name.length,
    m = typed.length;
  let i = 0,
    j = 0;
  while (j < m) {
    if (i < n && name[i] === typed[j]) {
      i++;
      j++;
    } else if (j > 0 && typed[j] === typed[j - 1]) {
      j++;
    } else {
      return false;
    }
  }
  return i === n;
};

// var isLongPressedName = function (name, typed) {
//   let result = true;

//   let start = 0;
//   let validIndex = 0;

//   while (start < name.length) {
//     /**
//      * find char and same chars length
//      */
//     let char = undefined;
//     let charLength = 0;

//     for (let index = start; index < name.length; index++) {
//       if (char === undefined) {
//         char = name.charAt(index);
//         charLength = 1;
//       } else if (name.charAt(index) !== char) {
//         break;
//       } else {
//         charLength++;
//       }
//     }

//     /**
//      * handle typed chars
//      */

//     let validChar = typed.charAt(validIndex);
//     if (char !== validChar) {
//       return false;
//     }

//     let sameCharLength = 0;

//     while (validIndex < typed.length) {
//       if (typed.charAt(validIndex) !== validChar) {
//         break;
//       }
//       sameCharLength++;
//       validIndex++;
//     }

//     if (sameCharLength < charLength) {
//       return false;
//     }

//     start += charLength;
//   }

//   return result;
// };
// @lc code=end
