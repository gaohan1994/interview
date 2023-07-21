{
  // https://github.com/yygmind/blog/issues/43
  // 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。
  // 如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用
  // 不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

  function revert(num) {
    let result = "";

    function traverse(str) {
      if (str.length === 1) {
        result = result + str;
      } else {
        const node = str.charAt(str.length - 1);
        result = result + node;
        traverse(str.slice(0, str.length - 1));
      }
    }

    traverse(`${num}`);

    return result;
  }

  const result = revert(12345);

  console.log("result", result);
}
