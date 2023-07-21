{
  // kebab-case snake_case 转 camelCase (字符串转小驼峰)

  /**
   * 思路：
   *
   * 1、按照 - 分割字符串
   * 2、拿到分割后的字符串数组对下标1开始的字符串第一个大写字母进行转大写
   * 3、拼接
   * 4、边界处理
   * 5、返回
   *
   * @param {*} str
   */
  function changeStr(str) {
    let result = "";

    const splitStrArray = str.split("_");

    for (let index = 0; index < splitStrArray.length; index++) {
      const splitStr = splitStrArray[index];

      if (index === 0) {
        result += splitStr;
      } else {
        const handledSplitStr =
          splitStr.slice(0, 1).toUpperCase() + splitStr.slice(1, splitStr.length);
        result += handledSplitStr;
      }
    }

    return result;
  }
}
